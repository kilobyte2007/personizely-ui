<template>
  <SelectRoot v-bind="omit(forwarded, ['class', 'placeholder', 'keys', 'options', 'disablePortal', 'modelValue', 'onUpdate:modelValue'])" v-model="modelValue">
    <SelectTrigger :class="cn((multiple && Array.isArray(modelValue) && modelValue.length === 0) || !modelValue ? 'text-muted-foreground' : '', props.class)">
      <SelectValue :placeholder="placeholder">
        <slot v-if="$slots.label" name="label" v-bind="{ option: selectedOption }">
          {{ selectedOptionLabel }}
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
  useForwardPropsEmits,
  type SelectRootEmits,
  type SelectRootProps
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import SelectContent from './SelectContent.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'
import SelectItem from './SelectItem.vue'
import omit from 'lodash/omit'
import { cn } from '@/utils/tailwind'

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

const forwarded = useForwardPropsEmits(props, emits)

const selectedOption = computed(() => {
  if (modelValue.value) {
    return preparedOptions.value.find(o => o[props.keys.value] === modelValue.value)
  }

  return null
})

const selectedOptionLabel = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value[props.keys.label]
  }

  return null
})

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
