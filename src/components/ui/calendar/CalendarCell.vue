<template>
  <CalendarCell
    :class="cn('relative h-7 w-7 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-accent [&:has([data-selected][data-outside-month])]:bg-accent/50', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>

<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarCell, type CalendarCellProps, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
