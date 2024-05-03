<template>
  <div
    ref="container"
    class="relative cursor-pointer w-full aspect-[4/2.5] rounded-md"
    :style="{ background }"
    @mousedown="handleMouseDown"
    @touchmove="handleMove"
    @touchstart="handleTouchStart"
    @touchend="isDragging = false"
  >
    <div class="overflow-hidden">
      <div class="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-white to-transparent" />
      <div class="absolute inset-0 w-full h-full rounded-md bg-gradient-to-t from-black to-transparent" />
    </div>
    <div
      class="absolute cursor-pointer"
      :style="{
        left: left + '%',
        top: top + '%'
      }"
    >
      <div
        class="w-3 h-3 border-2 border-white box-content shadow-md inset-shadow-sm inset-shadow-md rounded-full transform -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabindex="0"
        role="presentation"
        @keydown.up.prevent="onUp"
        @keydown.down.prevent="onDown"
        @keydown.right="onRight"
        @keydown.left="onLeft"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const calculateHandleLeftPosition = (saturation: number) => saturation * 100
const calculateHandleTopPosition = (value: number) => -(value * 100) + 100

const emit = defineEmits(['update', 'update:saturation', 'update:value'])
const props = defineProps<{
  saturation: number
  value: number
  hue: number
}>()

const container = ref<HTMLElement>()
const isDragging = ref(false)
const left = ref(calculateHandleLeftPosition(props.saturation))
const top = ref(calculateHandleTopPosition(props.value))

const background = computed(() => `hsl(${props.hue}, 100%, 50%)`)

watch(() => props.saturation, () => {
  if (!isDragging.value) {
    left.value = calculateHandleLeftPosition(props.saturation)
  }
})
watch(() => props.value, () => {
  if (!isDragging.value) {
    top.value = calculateHandleTopPosition(props.value)
  }
})

const clamp = (value: number, min: number, max: number) => {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

const onUp = () => {
  const value = props.value + 0.1
  emit('update:value', value <= 1 ? value : 1)
}

const onDown = () => {
  const value = props.value - 0.1
  emit('update:value', value >= 0 ? value : 0)
}

const onLeft = () => {
  const saturation = props.saturation - 0.1
  emit('update:saturation', saturation >= 0 ? saturation : 0)
}

const onRight = () => {
  const saturation = props.saturation + 0.1
  emit('update:saturation', saturation <= 1 ? saturation : 1)
}

const handleMove = (e: MouseEvent | TouchEvent) => {
  e.preventDefault()
  const containerWidth = container.value!.clientWidth
  const containerHeight = container.value!.clientHeight

  const xOffset = container.value!.getBoundingClientRect().left + window.scrollX
  const yOffset = container.value!.getBoundingClientRect().top + window.scrollY
  const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
  const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY
  const l = clamp(pageX - xOffset, 0, containerWidth) / containerWidth * 100
  const t = clamp(pageY - yOffset, 0, containerHeight) / containerHeight * 100

  left.value = l
  top.value = t

  const saturation = l
  const value = -(t / 100) + 1

  emit('update', {
    s: saturation,
    v: value,
    h: props.hue
  })
}

const handleMouseDown = () => {
  isDragging.value = true
  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', handleMouseUp)
}

const handleMouseUp = (e: MouseEvent) => {
  handleMove(e)
  unbindEventListeners()
  isDragging.value = false
}

const handleTouchStart = (e: TouchEvent) => {
  isDragging.value = true
  handleMove(e)
}

const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('mouseup', handleMouseUp)
}

onBeforeUnmount(() => {
  unbindEventListeners()
})
</script>
