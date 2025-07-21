<template>
  <ProgressIndicator
    :class="cn(
      'h-full w-full flex-1 bg-primary transition-all absolute top-0 left-0',
      props.class,
    )"
    :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
  />
</template>

<script setup lang="ts">
import { ProgressIndicator, type ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'

const props = withDefaults(defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: 0
})
</script>
