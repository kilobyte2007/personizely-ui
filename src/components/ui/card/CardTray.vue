<template>
  <div :class="cn('absolute right-0 top-0', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
