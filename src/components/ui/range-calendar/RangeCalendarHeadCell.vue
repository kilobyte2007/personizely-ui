<template>
  <RangeCalendarHeadCell :class="cn('w-7 rounded-md text-[0.8rem] font-normal text-muted-foreground', props.class)" v-bind="forwardedProps">
    <slot />
  </RangeCalendarHeadCell>
</template>

<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps, useForwardProps } from 'radix-vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<RangeCalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
