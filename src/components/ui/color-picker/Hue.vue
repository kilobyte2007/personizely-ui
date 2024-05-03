<template>
  <Rail
    :orientation="orientation"
    :background="background"
    @drag="onDrag"
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
  >
    <Handle
      :style="{ [props.orientation === 'horizontal' ? 'left' : 'top']: offset + '%' }"
      :class="orientation === 'horizontal' ? 'h-full w-2 -translate-x-1/2' : 'w-full h-2 -translate-y-1/2'"
      @up="increment"
      @down="decrement"
    />
  </Rail>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Rail from './Rail.vue'
import Handle from './Handle.vue'

const calculateHandlePosition = (hue: number) => (100 * hue / 360)

const modelValue = defineModel<number>({ required: true })
const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal'
})

const isDragging = ref(false)
const offset = ref(calculateHandlePosition(modelValue.value))

watch(modelValue, (to) => {
  if (!isDragging.value) {
    offset.value = calculateHandlePosition(to)
  }
})

const background = computed(() => {
  return props.orientation === 'horizontal'
    ? 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
    : 'linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
})

const onDragStart = (value: number) => {
  offset.value = value
  update(value)
  isDragging.value = true
}

const onDragEnd = () => {
  isDragging.value = false
}

const onDrag = (value: number) => {
  offset.value = value
  update(value)
}

const update = (value: number) => {
  const h = (360 * value / 100)
  if (h !== modelValue.value) {
    modelValue.value = Math.round(h)
  }
}

const increment = () => {
  let i = 10
  const value = modelValue.value + i
  modelValue.value = value <= 360 ? value : value - 360
}

const decrement = () => {
  let i = 10
  const value = modelValue.value - i
  modelValue.value = value >= 0 ? value : 360 + value
}
</script>
