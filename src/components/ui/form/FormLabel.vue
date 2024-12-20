<template>
  <Label
    :class="cn(
      error && 'text-destructive',
      props.class,
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { LabelProps } from 'reka-ui'
import { useFormField } from './useFormField'
import { cn } from '@/utils/tailwind'
import { Label } from '@/components/ui/label'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>
