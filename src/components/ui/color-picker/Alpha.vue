<template>
  <Rail
    :orientation="orientation"
    :background="background"
    @drag="update"
    @drag-start="update"
  >
    <Handle
      :style="{ [orientation === 'horizontal' ? 'left' : 'top']: modelValue * 100 + '%' }"
      :class="orientation === 'horizontal' ? 'h-full w-2 -translate-x-1/2' : 'w-full h-2 -translate-y-1/2'"
      @up="increment"
      @down="decrement"
    />
  </Rail>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Rail from './Rail.vue'
import Handle from './Handle.vue'
import type { Numberify } from '@ctrl/tinycolor'

interface RGB {
  r: string
  g: string
  b: string
}

const modelValue = defineModel<number>({ required: true })
const props = withDefaults(defineProps<{
  rgb: Numberify<RGB>
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal'
})

const background = computed(() => {
  const { rgb, orientation } = props
  const rgbStr = [rgb.r, rgb.g, rgb.b].join(', ')
  return orientation === 'horizontal'
    ? `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`
    : `linear-gradient(to bottom, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`
})

const update = (left: number) => {
  const alpha = left / 100
  if (alpha !== modelValue.value) {
    modelValue.value = alpha
  }
}

const increment = () => {
  let i = 0.1
  const value = modelValue.value + i
  modelValue.value = value <= 1 ? value : 1
}

const decrement = () => {
  let i = 0.1
  const value = modelValue.value - i
  modelValue.value = value >= 0 ? value : 0
}
</script>
