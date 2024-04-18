<template>
  <div :class="cn('items-top flex gap-x-2', props.class)">
    <CheckboxBase
      :id="id"
      v-model:checked="modelValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :default-checked="defaultChecked"
      :value="value"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />

    <div v-if="help || $slots.help" class="grid gap-1 leading-[1.2] peer-disabled:[&>label]:cursor-not-allowed peer-disabled:opacity-70">
      <label
        :for="id"
        class="text-sm font-medium leading-[1.2]"
      >
        <slot>{{ label }}</slot>
      </label>
      <p class="text-sm text-muted-foreground">
        <slot name="help">
          {{ help }}
        </slot>
      </p>
    </div>

    <label
      v-else-if="label || $slots.default"
      :for="id || name"
      class="text-sm font-medium leading-[1.2] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes, type Events } from 'vue'
import { useId } from 'radix-vue'
import { cn } from '@/utils'
import CheckboxBase from './CheckboxBase.vue'

const modelValue = defineModel<boolean | 'indeterminate'>()
const props = withDefaults(defineProps<{
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
  class?: HTMLAttributes['class']
  label?: string
  help?: string
}>(), {
  id: () => useId()
})
defineEmits<{
  focus: [event: Events['onFocus']]
  blur: [event: Events['onBlur']]
}>()
</script>
