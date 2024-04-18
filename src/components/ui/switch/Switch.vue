<template>
  <div class="flex items-center gap-x-2">
    <SwitchBase
      :id="id"
      v-model:checked="modelValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="value"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <Label v-if="label || $slots.default" :for="id">
      <slot>{{ label }}</slot>
    </Label>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import SwitchBase from './SwitchBase.vue'
import { useId } from 'radix-vue'
import type { Events } from 'vue'

const modelValue = defineModel<boolean>()
withDefaults(defineProps<{
  name?: string
  id?: string
  label?: string
  value?: string
  required?: boolean
  disabled?: boolean
}>(), {
  id: () => useId()
})
defineEmits<{
  focus: [event: Events['onFocus']]
  blur: [event: Events['onBlur']]
}>()
</script>
