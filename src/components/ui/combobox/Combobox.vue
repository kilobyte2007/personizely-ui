<script setup lang="ts">
import { type HTMLAttributes, computed, ref } from 'vue'
import { ComboboxItemIndicator, type ComboboxRootEmits, type ComboboxRootProps, Primitive } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { cn } from '@/utils'
import ComboboxRoot from './ComboboxRoot.vue'
import ComboboxContent from './ComboboxContent.vue'
import ComboboxItem from './ComboboxItem.vue'
import ComboboxInput from './ComboboxInput.vue'
import ComboboxEmpty from './ComboboxEmpty.vue'
import ComboboxGroup from './ComboboxGroup.vue'
import { Check } from 'lucide-vue-next'
import Popover from '@/components/ui/popover'
import { ChevronDown } from 'lucide-vue-next'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import omit from 'lodash/omit'

const modelValue = defineModel<number | string | number[] | string[] | boolean | null | undefined>()
const props = withDefaults(defineProps<ComboboxRootProps & {
  class?: HTMLAttributes['class'],
  placeholder?: string
  searchPlaceholder?: string,
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string },
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


const open = ref(false)
const searchTerm = ref(null)

const onSelect = ({ detail }) => {
  modelValue.value = detail.value
  open.value = false
  requestAnimationFrame(() => {
    searchTerm.value = null
  })
}

const onToggle = (open: boolean) => {
  if (open) {
    requestAnimationFrame(() => {
      searchTerm.value = null
    })
  }
}

const selectedValueLabel = computed(() => {
  if (modelValue.value) {
    const option = preparedOptions.value.find(o => o.value === modelValue.value)
    if (option) {
      return option[props.keys.label]
    }
  }

  return null
})

const forwarded = useForwardPropsEmits(omit(), emits)

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>

<template>
  <Popover
    v-model:open="open"
    class="p-0 min-w-[--radix-popper-anchor-width]"
    @update:open="onToggle"
  >
    <template #trigger>
      <Primitive
        as="button"
        role="combobox"
        :aria-expanded="open"
        :class="cn('flex h-8 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-[180px]',
                   !modelValue ? 'text-muted-foreground' : '',
                   props.class
        )"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
        {{ selectedValueLabel || placeholder }}
        <ChevronDown class="w-4 h-4 text-muted-foreground" />
      </Primitive>
    </template>

    <ComboboxRoot
      v-bind="forwarded"
      v-model="modelValue"
      v-model:search-term="searchTerm"
      class="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground"
    >
      <ComboboxInput :placeholder="searchPlaceholder" />
      <ComboboxEmpty>No matching options.</ComboboxEmpty>
      <ComboboxContent>
        <ComboboxGroup>
          <ComboboxItem
            v-for="(option, index) in preparedOptions"
            :key="option[keys.id] || index"
            :value="option[keys.value]"
            :disabled="option[keys.disabled] || disabled"
            @select="onSelect"
          >
            <slot name="option" v-bind="option">
              {{ option[keys.label] || option }}
            </slot>
            <ComboboxItemIndicator as-child>
              <Check class="ml-auto h-4 w-4 text-muted-foreground" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </ComboboxRoot>
  </Popover>
</template>
