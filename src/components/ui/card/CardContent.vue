<template>
  <div :class="cn(props.class)">
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
