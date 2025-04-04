<template>
  <Field
    v-slot="slotProps"
    :name="name"
    :rules="rules"
    :model-modifiers="modelModifiers"
    :label="errorLabel || label"
  >
    <div :class="cn('flex flex-col gap-2 group', props.class)">
      <FormLabel v-if="$slots.label || label" :class="required ? 'after:content-[\'*\'] after:ms-0.5 after:text-red-500 dark:after:text-red-40' : ''">
        <slot name="label">
          {{ label }}
        </slot>
      </FormLabel>
      <FormControl>
        <slot v-bind="slotProps" />
      </FormControl>
      <FormDescription v-if="($slots.description || description) && !slotProps.errors.length">
        <slot name="description">
          {{ description }}
        </slot>
      </FormDescription>
      <FormMessage />
    </div>
  </Field>
</template>

<script lang="ts">
import type { HTMLAttributes, InjectionKey } from 'vue'

export const FORM_ITEM_INJECTION_KEY
  = Symbol() as InjectionKey<string>
</script>

<script lang="ts" setup>
import { Field } from 'vee-validate'
import { provide } from 'vue'
import { useId } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import FormMessage from './FormMessage.vue'
import FormDescription from './FormDescription.vue'
import FormControl from './FormControl.vue'
import FormLabel from './FormLabel.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class'],
  name: string
  description?: string
  label?: string
  errorLabel?: string
  required?: boolean
  rules?: string
  modelModifiers?: { [key:string]: any }
}>(), {
  default: () => {},
  required: false
})

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>
