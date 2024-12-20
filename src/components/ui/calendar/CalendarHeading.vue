<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    :class="cn('text-xs font-medium', props.class)"
    v-bind="forwardedProps"
  >
    <slot>
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>

<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<CalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
