<template>
  <DialogTitle
    :class="cn('text-lg font-medium text-foreground', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DialogTitle, type DialogTitleProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
