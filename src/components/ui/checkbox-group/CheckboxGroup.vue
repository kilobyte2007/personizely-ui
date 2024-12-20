<template>
  <div :class="checkboxGroupVariants({ direction: horizontal ? 'horizontal' : 'vertical' })">
    <Checkbox
      v-for="(option, index) in preparedOptions"
      :id="`${name}-${option[keys.id] || option[keys.value]}`"
      :key="option[keys.id] || index"
      :disabled="disabled || option[keys.disabled]"
      :help="disabled || option[keys.help]"
      :name="`${name}[${option[keys.value]}]`"
      :model-value="modelValue.includes(option[keys.value])"
      @update:model-value="onUpdate(option, $event)"
      @blur="$emit('blur', option, $event)"
      @focus="$emit('focus', option, $event)"
    >
      <slot v-bind="{ option }">
        {{ option[keys.label] || option }}
      </slot>
      <template v-if="$slots.help" #help>
        <slot v-bind="{ option }" name="help">
          {{ option[keys.help] }}
        </slot>
      </template>
    </Checkbox>
  </div>
</template>

<script setup lang="ts">
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import { computed, type Events } from 'vue'
import { prepareOptions } from '@/utils/options'
import type { Keys, Option, CustomOption } from '@/utils/options'
import { checkboxGroupVariants } from './'
import { useId } from 'reka-ui'

const modelValue = defineModel<(string | number)[]>({
  default: () => []
})
const props = withDefaults(defineProps<{
  name?: string
  horizontal?: boolean
  disabled?: boolean
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
  horizontal: false,
  disabled: false,
  name: () => useId(),
  keys: () => ({
    id: 'id',
    label: 'label',
    help: 'help',
    value: 'value',
    disabled: 'disabled'
  })
})
defineEmits<{
  focus: [option: Option | CustomOption, event: Events['onFocus']]
  blur: [option: Option | CustomOption, event: Events['onBlur']]
}>()

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))

const onUpdate = (option: Option | CustomOption, checked: boolean) => {
  const value = [...modelValue.value]
  if (checked) {
    value.push(option[props.keys.value])
  } else {
    value.splice(value.indexOf(option[props.keys.value]), 1)
  }

  modelValue.value = value
}
</script>
