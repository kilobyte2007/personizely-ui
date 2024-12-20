<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'text-sm font-medium leading-[1.2] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-[:has([disabled])]:opacity-70 group-[:has([disabled])]:cursor-not-allowed',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label, type LabelProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
