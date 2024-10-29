<template>
  <div class="flex flex-col gap-4">
    <Rail
      ref="rail"
      :background="compile({ points, angle: 90, type: 'linear' })"
      @drag="movePoint"
      @drag-start="onDragStart"
    >
      <Handle
        v-for="(point, index) in points"
        :key="index"
        :style="{ left: point.left + '%', backgroundColor: point.color }"
        role="presentation"
        class="h-full w-2 -translate-x-1/2"
        :class="point === currentPoint && 'border-primary'"
        @touchstart.passive="selectPoint(point)"
        @mousedown="selectPoint(point)"
        @keydown.enter.prevent="selectPoint(point)"
        @keydown.space.prevent="selectPoint(point)"
        @up="increase(point)"
        @down="decrease(point)"
      />
    </Rail>
    <Color v-model="currentPoint.color" />
    <div class="flex gap-4 justify-between md:justify-normal">
      <Select
        v-model="type"
        :options="typeOptions"
        class="grow"
      />
      <div
        v-if="type === 'linear'"
        class="flex gap-4"
      >
        <Angle
          v-model="angle"
        />
        <Input
          v-model.number="angle"
          :min="1"
          :max="360"
          class="w-14 [&>input]:text-center [&>input]:pe-4"
          trailing
        >
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">°</span>
          </template>
        </Input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Rail from './Rail.vue'
import Color from './Color.vue'
import Handle from './Handle.vue'
import Angle from './Angle.vue'
import Input from '../input/Input.vue'
import Select from '../select/Select.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { parseGradient, compile } from '@/utils/gradient.js'
import type { Point } from '@/utils/gradient.js'

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<{
  modelValue: string
  min?: number
  max?: number
}>(), {
  min: 2,
  max: 5
})

const typeOptions = [
  { value: 'linear', label: 'Linear' },
  { value: 'radial', label: 'Radial' }
]

const initialGradient = parseGradient(props.modelValue)
const points = ref(initialGradient.points)
const type = ref(initialGradient.type)
const angle = ref(initialGradient.angle)
const shape = ref(initialGradient.shape)
const xAxis = ref(initialGradient.xAxis)
const yAxis = ref(initialGradient.yAxis)

const gradient = computed(() => {
  return compile({
    points: points.value,
    angle: angle.value,
    type: type.value
  })
})

const currentPoint = ref(points.value[0])

watch(gradient, () => {
  emit('update:modelValue', gradient.value)
})

watch(() => props.modelValue, (to) => {
  if (to !== gradient.value) {
    const newGradient = parseGradient(props.modelValue)
    points.value = newGradient.points
    type.value = newGradient.type
    angle.value = newGradient.angle
    shape.value = newGradient.shape
    xAxis.value = newGradient.xAxis
    yAxis.value = newGradient.yAxis
  }
})

const findClosestPoint = (left: number) => {
  const sortedPoints = [...points.value].sort((a, b) => Math.abs(left - a.left) - Math.abs(left - b.left))
  return sortedPoints[0]
}

const addPoint = (left: number) => {
  const point = {
    color: findClosestPoint(left).color,
    left
  }
  points.value.push(point)
  points.value.sort((a, b) => a.left - b.left)
  currentPoint.value = point
}

const removePoint = () => {
  const idx = points.value.indexOf(currentPoint.value)
  points.value.splice(idx, 1)
  currentPoint.value = findClosestPoint(currentPoint.value.left)
}

const selectPoint = (point: Point) => {
  currentPoint.value = point
}

const movePoint = (left: number) => {
  currentPoint.value.left = left
  points.value.sort((a, b) => a.left - b.left)
}

const increase = (point: Point) => {
  const value = point.left + 10
  point.left = value <= 100 ? value : 100
}

const decrease = (point: Point) => {
  const value = point.left - 10
  point.left = value >= 0 ? value : 0
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.target!.tagName.toLowerCase() !== 'input' && ['delete', 'backspace'].includes(e.key.toLowerCase()) && points.value.length > props.min) {
    removePoint()
  }
}

const onDragStart = (left: number, isRail: boolean) => {
  if (isRail) {
    if (points.value.length < props.max) {
      addPoint(left)
    } else {
      movePoint(left)
    }
  }
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>
