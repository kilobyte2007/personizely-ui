<template>
  <p
    :id="formDescriptionId"
    :class="cn('text-sm text-muted-foreground group-[:has([disabled])]:opacity-70 group-[:has([disabled])]:cursor-not-allowed', props.class)"
  >
    <slot />
  </p>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { useFormField } from './useFormField'
import { cn } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>
