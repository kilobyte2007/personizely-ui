<template>
  <AutocompleteRoot
    v-bind="omit(forwarded, ['class', 'placeholder', 'searchPlaceholder', 'keys', 'options', 'autofocus'])"
    v-model="normalizedValue"
    v-model:search-term="searchTerm"
    v-model:open="open"
    :filter-function="filterFunction"
    :reset-search-term-on-blur="false"
    @update:model-value="searchTerm = $event"
    @update:search-term="normalizedValue = $event"
  >
    <ComboboxAnchor :class="cn('flex h-8 items-center w-full justify-between rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1', props.class)">
      <ComboboxInput
        ref="input"
        :auto-focus="autofocus"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="cn(
          'flex h-8 w-full bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
          loading ? 'pe-8' : 'pe-2'
        )"
      />
      <div v-if="loading" class="pointer-events-none">
        <ProgressCircular class="size-4 text-muted-foreground" />
      </div>

      <Primitive
        v-else-if="modelValue"
        as="button"
        class="focus:outline-none focus:ring-2 rounded focus:ring-ring focus:ring-offset-2"
        @click="reset"
      >
        <X class="w-4 h-4 opacity-50" />
      </Primitive>
    </ComboboxAnchor>

    <ComboboxPortal v-if="(disableFilter && preparedOptions.length > 0) || filterFunction(preparedOptions.map(o => o[keys.value]), searchTerm).length > 0">
      <AutocompleteContent :side-offset="5">
        <ComboboxViewport class="p-1 max-h-[300px] overflow-y-auto overflow-x-hidden">
          <AutocompleteGroup>
            <AutocompleteItem
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
            </AutocompleteItem>
          </AutocompleteGroup>
        </ComboboxViewport>
      </AutocompleteContent>
    </ComboboxPortal>
  </AutocompleteRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed, ref } from 'vue'
import {
  ComboboxItemIndicator,
  ComboboxAnchor,
  Primitive,
  useForwardPropsEmits,
  type ComboboxItemEmits,
  type ComboboxRootEmits,
  type ComboboxRootProps,
  ComboboxPortal,
  ComboboxViewport,
  ComboboxInput
} from 'radix-vue'
import { cn } from '@/utils/tailwind'
import AutocompleteRoot from './AutocompleteRoot.vue'
import AutocompleteContent from './AutocompleteContent.vue'
import AutocompleteItem from './AutocompleteItem.vue'
import AutocompleteGroup from './AutocompleteGroup.vue'
import { Check } from 'lucide-vue-next'
import { X } from 'lucide-vue-next'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import omit from 'lodash/omit'
import { useEmpty } from '@/composables/useEmpty'
import { ProgressCircular } from '@/components/ui/progress-circular'

const modelValue = defineModel<ComboboxRootProps['modelValue']>()
const normalizedValue = useEmpty(modelValue)

const props = withDefaults(defineProps<Omit<ComboboxRootProps, 'modelValue' | 'searchTerm' | 'resetSearchTermOnBlur'> & {
  class?: HTMLAttributes['class']
  placeholder?: string
  loading?: boolean
  disableFilter?: boolean
  autofocus?: boolean
  searchPlaceholder?: string
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
  disableFilter: false,
  loading: false,
  autofocus: false,
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
  blur: [event: MouseEvent]
  focus: [event: MouseEvent]
  select: [option: Option | CustomOption]
}>()

const open = ref(false)
const searchTerm = ref()
const input = ref<typeof ComboboxInput | undefined>(undefined)

const onSelect = (event: ComboboxItemEmits['select'][0], option: Option | CustomOption) => {
  modelValue.value = event.detail.value
  emits('select', option)
}

const reset = () => {
  modelValue.value = null
  searchTerm.value = null
  input.value.$el.focus()
}

const filterFunction = (options: any, searchTerm: string) => {
  if (props.disableFilter) return options

  return options.filter((option: any) => {
    const result = preparedOptions.value.find((o: Option | CustomOption) => {
      return o[props.keys.value] === option
    })

    return result ? result[props.keys.label]?.toLowerCase().includes(searchTerm?.toLowerCase()) : false
  })
}

const forwarded = useForwardPropsEmits(props, emits)

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
