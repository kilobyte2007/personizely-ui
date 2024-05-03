<template>
  <div :style="{ backgroundImage: background }" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: number
  white?: string
  black?: string
}>(), {
  size: 8,
  white: '#ffffff',
  black: '#e6e6e6'
})

const background = computed(() => `url(${getCheckboard(props.white, props.black, props.size)})`)

const renderCheckboard = (c1: string, c2: string, size: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size * 2
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return null
  }

  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)

  return canvas.toDataURL()
}

const getCheckboard = (c1: string, c2: string, size: number) => {
  return renderCheckboard(c1, c2, size)
}
</script>
