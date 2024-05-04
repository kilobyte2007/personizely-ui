<template>
  <Field v-slot="{ componentField, errors }" :name="name" :rules="rules">
    <div :class="cn('flex flex-col gap-2 group', props.class)">
      <FormLabel v-if="$slots.label || label" :class="required ? 'after:content-[\'*\'] after:ms-0.5 after:text-red-500 dark:after:text-red-40' : ''">
        <slot name="label">
          {{ label }}
        </slot>
      </FormLabel>
      <FormControl>
        <slot v-bind="{ componentField }" />
      </FormControl>
      <FormDescription v-if="($slots.description || description) && !errors.length">
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
import { useId } from 'radix-vue'
import { cn } from '@/utils'
import FormMessage from './FormMessage.vue'
import FormDescription from './FormDescription.vue'
import FormControl from './FormControl.vue'
import FormLabel from './FormLabel.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class'],
  name: string
  description?: string
  label?: string
  required?: boolean
  rules?: string
}>(), {
  required: false
})

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>
