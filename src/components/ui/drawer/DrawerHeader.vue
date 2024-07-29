<template>
  <div
    :class="
      cn('flex flex-col gap-y-2 text-center px-6 sm:text-left', props.class)
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>
