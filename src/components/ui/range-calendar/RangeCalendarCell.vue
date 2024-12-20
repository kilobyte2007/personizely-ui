<template>
  <RangeCalendarCell
    :class="cn(
      'relative h-7 w-7 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-outside-month])]:bg-accent/50 [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md',
      '[&:has([data-highlighted])]:bg-accent first:[&:has([data-highlighted])]:rounded-l-md last:[&:has([data-highlighted])]:rounded-r-md [&:has([data-highlighted][data-outside-month])]:bg-accent/50 [&:has([data-highlighted][data-highlighted-end])]:rounded-r-md [&:has([data-highlighted][data-highlighted-start])]:rounded-l-md',
      props.class
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCell>
</template>

<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarCell, type RangeCalendarCellProps, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<RangeCalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
