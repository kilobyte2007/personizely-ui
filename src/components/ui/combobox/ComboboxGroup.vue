<template>
  <SelectGroup
    v-bind="delegatedProps"
    :class="cn('overflow-hidden text-foreground', props.class)"
  >
    <SelectLabel v-if="heading" class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
      {{ heading }}
    </SelectLabel>
    <slot />
  </SelectGroup>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxGroupProps } from 'reka-ui'
import { SelectGroup, SelectLabel } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<ComboboxGroupProps & {
  class?: HTMLAttributes['class']
  heading?: string
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
