<template>
  <input
    :value="modelValue"
    :class="cn('flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
    @input="modelValue = ($event.target as HTMLInputElement).value"
  >
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'

const modelValue = defineModel<string | number | null>()

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
