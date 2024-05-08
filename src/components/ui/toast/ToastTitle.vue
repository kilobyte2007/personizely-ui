<template>
  <ToastTitle v-bind="delegatedProps" :class="cn('text-xs font-semibold', props.class)">
    <slot />
  </ToastTitle>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastTitle, type ToastTitleProps } from 'radix-vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
