<template>
  <ComboboxRoot
    v-bind="forwarded"
    v-model="normalizedValue"
    v-model:search-term="searchTerm"
    v-model:open="open"
    @update:open="onToggle"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger
        ref="button"
        role="combobox"
        :aria-disabled="disabled"
        :aria-expanded="open"
        :tabindex="null"
        :class="cn('flex h-8 items-center justify-between rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[180px]',
                   !modelValue ? 'text-muted-foreground' : '',
                   props.class
        )"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
        <span class="pointer-events-none">
          <slot v-if="selectedOption" name="label" v-bind="{ option: selectedOption }">
            {{ selectedOptionLabel }}
          </slot>
          <template v-else>
            {{ placeholder }}
          </template>
        </span>
        <ChevronDown class="w-4 h-4 opacity-50" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent :side-offset="5">
        <ComboboxInput :placeholder="searchPlaceholder" @keydown.tab.prevent />
        <ComboboxViewport class="p-1">
          <ComboboxEmpty>No matching options.</ComboboxEmpty>
          <ComboboxGroup>
            <ComboboxItem
              v-for="(option, index) in preparedOptions"
              :key="option[keys.id] || index"
              :value="option[keys.value]"
              :disabled="option[keys.disabled] || disabled"
              @select="onSelect"
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

const props = withDefaults(defineProps<Omit<ComboboxRootProps, 'modelValue'> & {
  class?: HTMLAttributes['class']
  placeholder?: string
  searchPlaceholder?: string
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
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

const emits = defineEmits<ComboboxRootEmits & {
  blur: [option: Option[] | CustomOption[]]
  focus: [option: Option[] | CustomOption[]]
}>()

const button = ref<ComponentInstance<typeof ComboboxTrigger>>()
const open = ref(false)
const searchTerm = ref()

const onSelect = (event: ComboboxItemEmits['select'][0]) => {
  modelValue.value = event.detail.value
  requestAnimationFrame(() => {
    searchTerm.value = null
  })
}

const onToggle = (open: boolean) => {
  requestAnimationFrame(() => {
    if (!open) {
      button.value!.$el.focus()
    }
    searchTerm.value = null
  })
}

const selectedOption = computed(() => {
  if (modelValue.value) {
    return preparedOptions.value.find(o => o.value === modelValue.value)
  }

  return null
})

const selectedOptionLabel = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value[props.keys.label]
  }

  return null
})

const forwarded = useForwardPropsEmits(omit(props, ['class', 'placeholder', 'searchPlaceholder', 'keys', 'options']), emits)

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
