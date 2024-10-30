<template>
  <ComboboxRoot
    v-bind="omit(forwarded, ['class', 'placeholder', 'searchPlaceholder', 'keys', 'options', 'disableFilter', 'disablePortal', 'modelValue', 'onUpdate:modelValue'])"
    v-model="normalizedValue"
    v-model:search-term="searchTerm"
    v-model:open="open"
    :filter-function="filterFunction"
    :reset-search-term-on-blur="false"
    :display-value="(value) => preparedOptions.find(o => o[keys.value] === value)?.[keys.label]"
    @update:open="onToggle"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger
        ref="button"
        role="combobox"
        :aria-disabled="disabled"
        :aria-expanded="open"
        :tabindex="null"
        :class="cn('flex gap-1.5 h-8 text-left items-center w-full justify-between rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
                   (multiple && Array.isArray(modelValue) && modelValue.length === 0) || !modelValue ? 'text-muted-foreground' : '',
                   props.class
        )"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
        <span class="pointer-events-none">
          <slot v-if="multiple && ($slots.label || selectedOptions.length)" name="label" v-bind="{ options: selectedOptions }">
            {{ selectedOptionsLabel }}
          </slot>
          <slot v-else-if="!multiple && ($slots.label || selectedOption)" name="label" v-bind="{ option: selectedOptions }">
            {{ selectedOptionLabel }}
          </slot>
          <template v-else>
            {{ placeholder }}
          </template>
        </span>
        <ChevronDown class="w-4 h-4 min-w-4 opacity-50" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal :disabled="disablePortal">
      <ComboboxContent :side-offset="5">
        <ComboboxInput :placeholder="searchPlaceholder" :loading="loading" @keydown.tab.prevent />
        <ComboboxViewport class="p-1 max-h-[300px] overflow-y-auto overflow-x-hidden">
          <ComboboxEmpty>No matching options.</ComboboxEmpty>
          <ComboboxGroup>
            <ComboboxItem
              v-for="(option, index) in preparedOptions"
              :key="option[keys.id] || option[keys.value] || index"
              :value="option[keys.value]"
              :disabled="option[keys.disabled] || disabled"
              @select="onSelect($event, option)"
            >
              <slot name="option" v-bind="{ option }">
                {{ option[keys.label] || option }}
              </slot>
              <ComboboxItemIndicator as-child>
                <Check class="ml-auto h-4 w-4 text-muted-foreground" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed, ref, type ComponentInstance } from 'vue'
import {
  ComboboxItemIndicator,
  ComboboxAnchor,
  useForwardPropsEmits,
  type ComboboxItemEmits,
  type ComboboxRootEmits,
  type ComboboxRootProps,
  ComboboxPortal,
  ComboboxTrigger,
  ComboboxViewport
} from 'radix-vue'
import { cn } from '@/utils/tailwind'
import ComboboxRoot from './ComboboxRoot.vue'
import ComboboxContent from './ComboboxContent.vue'
import ComboboxItem from './ComboboxItem.vue'
import ComboboxInput from './ComboboxInput.vue'
import ComboboxEmpty from './ComboboxEmpty.vue'
import ComboboxGroup from './ComboboxGroup.vue'
import { Check } from 'lucide-vue-next'
import { ChevronDown } from 'lucide-vue-next'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import omit from 'lodash/omit'
import { useEmpty } from '@/composables/useEmpty'

const modelValue = defineModel<ComboboxRootProps['modelValue']>()
const normalizedValue = useEmpty(modelValue)

const props = withDefaults(defineProps<Omit<ComboboxRootProps, 'modelValue' | 'resetSearchTermOnBlur'> & {
  class?: HTMLAttributes['class']
  placeholder?: string
  loading?: boolean
  disablePortal?: boolean
  disableFilter?: boolean
  searchPlaceholder?: string
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
  disableFilter: false,
  disablePortal: false,
  loading: false,
  placeholder: 'Select a value...',
  searchPlaceholder: 'Search...',
  keys: () => ({
    id: 'id',
    label: 'label',
    help: 'help',
    value: 'value',
    disabled: 'disabled'
  })
})

const emits = defineEmits<Omit<ComboboxRootEmits, 'update:modelValue'> & {
  blur: [event: MouseEvent]
  focus: [event: MouseEvent]
  select: [option: Option | CustomOption]
}>()

const button = ref<ComponentInstance<typeof ComboboxTrigger>>()
const open = ref(false)
const searchTerm = ref('')

const onSelect = (event: ComboboxItemEmits['select'][0], option: Option | CustomOption) => {
  modelValue.value = event.detail.value
  requestAnimationFrame(() => {
    searchTerm.value = ''
  })
  emits('select', option)
}

const onToggle = (open: boolean) => {
  requestAnimationFrame(() => {
    if (!open) {
      button.value!.$el.focus()
    }
    searchTerm.value = ''
  })
}

const filterFunction = (options: any, searchTerm: string) => {
  if (props.disableFilter) return options

  return options.filter((option: any) => {
    const result = preparedOptions.value.find((o: Option | CustomOption) => {
      return o[props.keys.value] === option
    })

    return result ? result[props.keys.label]?.toLowerCase().includes(searchTerm.toLowerCase()) : false
  })
}

const selectedOption = computed(() => {
  if (modelValue.value) {
    return preparedOptions.value.find((o) => {
      return o[props.keys.value] === modelValue.value
    })
  }

  return null
})

const selectedOptions = computed(() => {
  if (Array.isArray(modelValue.value)) {
    return preparedOptions.value.filter((o) => {
      return (<Array<unknown>>modelValue.value).includes(o[props.keys.value])
    })
  }

  return []
})

const selectedOptionLabel = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value[props.keys.label]
  }

  return null
})

const selectedOptionsLabel = computed(() => {
  if (selectedOptions.value) {
    return selectedOptions.value.map(o => o[props.keys.label]).join(', ')
  }

  return null
})

const forwarded = useForwardPropsEmits(props, emits)

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
