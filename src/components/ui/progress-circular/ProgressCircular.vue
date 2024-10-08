<template>
  <div :class="cn('text-muted-foreground', $attrs.class)">
    <svg
      v-if="modelValue !== null"
      role="progressbar"
      viewBox="25 25 50 50"
      :aria-valuemax="100"
      :aria-valuemin="0"
      :aria-valuenow="modelValue"
      class="max-w-full max-h-full"
    >
      <circle
        fill="none"
        stroke-dashoffset="0"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-dasharray="strokeDashArray"
        :stroke-width="stroke"
        :style="{ 'stroke-dashoffset': strokeDashOffset }"
        class="stroke-current transition-all"
      />
    </svg>

    <svg
      v-else
      class="animate-spin max-w-full max-h-full"
      role="progressbar"
      viewBox="25 25 50 50"
      :aria-valuemax="100"
      :aria-valuemin="0"
    >
      <circle
        :cx="size / 2"
        :cy="size / 2"
        fill="none"
        :r="radius"
        stroke-miterlimit="10"
        stroke-dasharray="89, 200"
        stroke-dashoffset="-35px"
        :stroke-width="stroke"
        class="stroke-current"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { cn } from '@/utils/tailwind'

const props = withDefaults(defineProps<{
  modelValue?: number | null
}>(), {
  modelValue: null
})

const stroke = 4
const size = 100

const moderateProgress = (value: number) => {
  if (value > 100) return 100
  if (value < 0) return 0

  return value
}

const strokeDashArray = computed(() => {
  const circumference = 2 * Math.PI * radius.value

  // Use first 3 decimal places, rounded as appropriate
  return Math.round(circumference * 1000) / 1000
})

const strokeDashOffset = computed(() => {
  const progress = moderateProgress(props.modelValue!)
  const circumference = 2 * Math.PI * radius.value

  return ((100 - progress) / 100) * circumference
})

const radius = computed(() => {
  return (size - stroke) / 5
})
</script>
