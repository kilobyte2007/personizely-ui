<template>
  <RangeCalendarHeader :class="cn('relative flex w-full items-center justify-between', props.class)" v-bind="forwardedProps">
    <slot />
  </RangeCalendarHeader>
</template>

<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarHeader, type RangeCalendarHeaderProps, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<RangeCalendarHeaderProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
