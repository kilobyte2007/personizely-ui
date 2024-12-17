<template>
  <span :class="cn('ml-auto pl-4 text-xs text-secondary-foreground', props.class)">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
