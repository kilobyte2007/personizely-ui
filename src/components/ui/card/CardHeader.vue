<template>
  <div :class="cn('relative flex flex-col gap-y-1.5', props.class)">
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
