<template>
  <div
    ref="container"
    class="relative select-none rounded-full w-8 h-8 cursor-pointer border dark:border-gray-700 border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    tabindex="0"
    @focus="beginKeyboardInput"
    @blur="endKeyboardInput"
    @mousedown="beginTracking"
    @touchmove.prevent.passive="onMouseMove"
    @touchstart.prevent.passive="onMouseMove"
  >
    <span
      class="absolute bottom-0 top-0 h-full left-1/2 before:content[''] before:absolute before:top-[6px] before:rounded-full before:bg-primary before:-translate-x-1/2 before:w-[6px] before:h-[6px]"
      :style="{ transform: `rotate(${modelValue}deg)` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: number
  max?: number
  min?: number
  step?: number
}>(), {
  max: 360,
  min: 0,
  step: 1
})

const emit = defineEmits<{
  'update:model-value': [value: number]
  'change': [value: number]
}>()

const container = ref<HTMLElement | null>(null)
const tracking = ref(false)

const radToDeg = (rad: number): number => {
  return rad * (180 / Math.PI)
}

const getCenter = (element: HTMLElement): [number, number] => {
  const rect = element.getBoundingClientRect()
  return [rect.left + (rect.width / 2), rect.top + (rect.height / 2)]
}

const angle = (vector: [number, number], element: HTMLElement): number => {
  const center = getCenter(element)
  const x = vector[0] - center[0]
  const y = vector[1] - center[1]
  let deg = -radToDeg(Math.atan2(x, y))
  deg += 180
  if (deg < 0) deg += 360
  return deg
}

const normalize = (degree: number): number => {
  const n = Math.max(props.min, Math.min(degree, props.max))
  const high = Math.ceil(n / props.step)
  const low = Math.round(n / props.step)
  return high >= n / props.step ? (high * props.step === 360 ? 0 : high * props.step) : low * props.step
}

// Event handlers
const onKeyDown = (e: KeyboardEvent) => {
  const LEFT_ARROW = 37
  const UP_ARROW = 38
  const RIGHT_ARROW = 39
  const DOWN_ARROW = 40

  let dir = 0
  switch (e.keyCode) {
  case UP_ARROW:
  case RIGHT_ARROW:
    dir = 1
    break
  case DOWN_ARROW:
  case LEFT_ARROW:
    dir = -1
    break
  }

  let val = props.modelValue + (dir * props.step)
  if (val === props.max + 1) val = props.min
  if (val === props.min - 1) val = props.max - 1
  val = normalize(val)

  if (dir) {
    e.preventDefault()
    emit('update:model-value', val)
  }
}

const updateWithEvent = (e: MouseEvent | TouchEvent) => {
  if (!container.value) return

  const vector: [number, number] = [
    'touches' in e ? e.touches[0].clientX : (e as MouseEvent).x,
    'touches' in e ? e.touches[0].clientY : (e as MouseEvent).y
  ]

  const deg = angle(vector, container.value)
  const value = normalize(deg)
  emit('update:model-value', value)
}

const onMouseMove = (e: MouseEvent | TouchEvent) => {
  updateWithEvent(e)
}

const onMouseUp = (e: MouseEvent | TouchEvent) => {
  updateWithEvent(e)
  endTracking()
}

const beginTracking = () => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
  tracking.value = true
}

const endTracking = () => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  tracking.value = false
}

const beginKeyboardInput = () => {
  document.addEventListener('keydown', onKeyDown)
}

const endKeyboardInput = () => {
  document.removeEventListener('keydown', onKeyDown)
}

onUnmounted(() => {
  if (tracking.value) {
    endTracking()
  }
  endKeyboardInput()
})
</script>
