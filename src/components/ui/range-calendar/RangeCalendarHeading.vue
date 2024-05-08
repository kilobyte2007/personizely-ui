<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    :class="cn('text-xs font-medium', props.class)"
    v-bind="forwardedProps"
  >
    <slot>
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>

<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { RangeCalendarHeading, type RangeCalendarHeadingProps, useForwardProps } from 'radix-vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<RangeCalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
