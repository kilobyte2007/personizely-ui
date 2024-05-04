<template>
  <ToastAction v-bind="delegatedProps" as-child>
    <Button
      size="sm"
      :class="props.class"
      :variant="variant === 'destructive' ? 'destructive' : 'ghost'"
    >
      <slot />
    </Button>
  </ToastAction>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastAction, type ToastActionProps } from 'radix-vue'
import Button from '@/components/ui/button'
import type { ToastVariants } from './'

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'], variant: ToastVariants['variant'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
