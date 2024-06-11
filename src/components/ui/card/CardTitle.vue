<template>
  <h3
    :class="
      cn('text-lg font-medium leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </h3>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
