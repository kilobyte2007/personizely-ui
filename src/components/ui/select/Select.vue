<template>
  <SelectRoot v-bind="forwarded" v-model="modelValue">
    <SelectTrigger :class="cn((multiple && Array.isArray(modelValue) && modelValue.length === 0) || !modelValue ? 'text-muted-foreground' : '', props.class)">
      <SelectValue :placeholder="placeholder">
        <slot v-if="multiple && Array.isArray(modelValue) && (modelValue.length || $slots.label)" name="label" v-bind="{ options: selectedOptions }">
          {{ selectedOptionsLabel || modelValue!.length + ' selected' }}
        </slot>
        <slot v-else-if="!multiple && (modelValue || $slots.label)" name="label" v-bind="{ option: selectedOption }">
          {{ selectedOptionLabel || modelValue }}
        </slot>
      </SelectValue>
    </SelectTrigger>
    <SelectPortal :disabled="disablePortal">
      <SelectContent :body-lock="false">
        <SelectItem
          v-for="(option, index) in preparedOptions"
          :key="option[keys.id] || index"
          :value="option[keys.value]"
          :disabled="option[keys.disabled] || disabled"
        >
          <slot name="option" v-bind="{ option }">
            {{ option[keys.label] || option }}
          </slot>
        </SelectItem>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import {
  SelectRoot,
  SelectPortal,
  type SelectRootEmits,
  type SelectRootProps
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import SelectContent from './SelectContent.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'
import SelectItem from './SelectItem.vue'
import { cn } from '@/utils/tailwind'
import { useDelegatedProps } from '@/composables/use-delegated-props'
import { forwardPropsEmits } from '@/composables/forward-props-emits'
import { useEmitAsProps } from '@/composables/emits-as-props'

const modelValue = defineModel<SelectRootProps['modelValue']>()

const props = withDefaults(defineProps<Omit<SelectRootProps, 'modelValue'> & {
  class?: HTMLAttributes['class']
  placeholder?: string
  disablePortal?: boolean
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
  disablePortal: false,
  placeholder: 'Select a value...',
  keys: () => ({
    id: 'id',
    label: 'label',
    help: 'help',
    value: 'value',
    disabled: 'disabled'
  })
})
const emits = defineEmits<Omit<SelectRootEmits, 'update:modelValue'>>()

const delegatedProps = useDelegatedProps(props, ['class', 'placeholder', 'keys', 'options', 'disablePortal', 'modelValue'])
const delegatedEmits = useEmitAsProps(emits, ['update:modelValue'])
const forwarded = forwardPropsEmits(delegatedProps, delegatedEmits)

defineSlots<{
  'label'(props: { option: CustomOption | undefined | null } | { options: Array<Option | CustomOption> }): any
  'option'(props: { option: Option | CustomOption }): any
}>()

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

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
