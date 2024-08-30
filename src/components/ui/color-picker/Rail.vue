<template>
  <div
    class="relative rounded-md user-select-none"
    :class="orientation === 'horizontal' ? 'h-8' : 'min-w-8'"
  >
    <div class="overflow-hidden">
      <Checkboard
        v-if="checkboard"
        class="absolute z-1 inset-0 overflow-hidden rounded-md"
      />
      <div
        class="absolute inset-0 rounded-md"
        :style="{ background }"
      />
    </div>
    <div
      ref="container"
      class="cursor-pointer relative flex items-center justify-center"
      :class="orientation === 'horizontal' ? 'h-full w-full' : 'w-full h-full'"
      role="slider"
      @mousedown="handleMouseDown"
      @touchmove="handleMove"
      @touchstart="handleTouchStart"
      @touchend="$emit('drag-end')"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkboard from './Checkboard.vue'
import { onBeforeUnmount, ref } from 'vue'

const emit = defineEmits(['drag', 'drag-start', 'drag-end'])
const props = withDefaults(defineProps<{
  checkboard?: boolean
  orientation?: 'horizontal' | 'vertical'
  background: string
}>(), {
  checkboard: true,
  orientation: 'horizontal'
})

const container = ref<HTMLElement>()

const handleMove = (e: MouseEvent | TouchEvent, skip: boolean = false) => {
  !skip && e.preventDefault()
  const offset = calculateOffset(e)

  if (!skip) {
    emit('drag', offset)
  }
}

const handleTouchStart = (e: TouchEvent) => {
  const offset = calculateOffset(e)
  emit('drag-start', offset, e.target === e.currentTarget)
  handleMove(e, true)
}

const handleMouseDown = (e: MouseEvent) => {
  if (!container.value!.contains(e.target as HTMLElement)) return

  handleMove(e, true)
  const offset = calculateOffset(e)
  emit('drag-start', offset, e.target === e.currentTarget)
  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', handleMouseUp)
}

const calculateOffset = (e: TouchEvent | MouseEvent) => {
  const offset = props.orientation === 'horizontal'
    ? ('touches' in e ? e.touches[0].pageX : e.pageX) - window.scrollX
    : ('touches' in e ? e.touches[0].pageY : e.pageY) - window.scrollY
  const rect = container.value!.getBoundingClientRect()
  const x = props.orientation === 'horizontal'
    ? offset - rect.left
    : offset - rect.top

  return Math.min(100, Math.max(0, Math.round(x / (props.orientation === 'horizontal' ? rect.width : rect.height) * 100)))
}

const handleMouseUp = () => {
  emit('drag-end')
  unbindEventListeners()
}

const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('mouseup', handleMouseUp)
}

onBeforeUnmount(() => {
  unbindEventListeners()
})
</script>
