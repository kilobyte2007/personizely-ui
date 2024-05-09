<template>
  <ToastClose v-bind="delegatedProps" as-child>
    <Button
      size="xs"
      icon="x"
      :variant="variant === 'destructive' ? 'destructive' : 'ghost'"
      :class="cn('absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100', props.class)"
    />
  </ToastClose>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastClose, type ToastCloseProps } from 'radix-vue'
import { cn } from '@/utils/tailwind'
import { Button } from '@/components/ui/button'
import type { ToastVariants } from './'

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class'],
  variant: ToastVariants['variant']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
