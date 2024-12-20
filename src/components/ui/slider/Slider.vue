<template>
  <SliderRoot
    v-bind="omit(forwarded, ['showMarker', 'modelValue', 'onUpdate:modelValue'])"
    v-model="value"
    :class="cn(
      'relative flex touch-none select-none data-[disabled]:opacity-50',
      (orientation === 'horizontal' ? 'w-full h-2 items-center' : 'h-full w-2 justify-center'),
      props.class,
    )"
  >
    <SliderTrack
      class="relative grow overflow-hidden rounded-full bg-secondary"
      :class="orientation === 'horizontal' ? 'h-2 w-full' : 'h-full w-2'"
    >
      <SliderRange
        class="absolute bg-primary"
        :class="orientation === 'horizontal' ? 'h-full' : 'w-full'"
      />
    </SliderTrack>
    <SliderThumb
      v-for="(thumbValue, index) in value ? value : []"
      :key="index"
      class="flex h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:pointer-events-none"
      :class="orientation === 'horizontal' ? 'justify-center' : 'items-center'"
      @focus="onFocus({ index, value: thumbValue }, $event)"
      @blur="onBlur({ value: thumbValue }, $event)"
    >
      <div
        v-if="showMarker && (visibleMarker === index)"
        class="absolute z-1 bg-primary rounded-sm px-1.5 py-1 shadow text-xs text-primary-foreground min-w-6 text-center"
        :class="orientation === 'horizontal' ? 'bottom-6' : 'left-6'"
      >
        <slot name="marker" v-bind="{ value: thumbValue }">
          {{ thumbValue }}
        </slot>
      </div>
    </SliderThumb>
  </SliderRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed, ref } from 'vue'
import type { SliderRootProps, SliderRootEmits } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import omit from 'lodash/omit'

const props = withDefaults(defineProps<Omit<SliderRootProps, 'modelValue'> & {
  class?: HTMLAttributes['class']
  showMarker?: boolean
  modelValue: number | number[]
}>(), {
  min: 0,
  max: 100,
  step: 10,
  orientation: 'horizontal',
  showMarker: false
})

const emits = defineEmits<Omit<SliderRootEmits, 'update:modelValue'> & {
  focus: [payload: number, event: FocusEvent]
  blur: [payload: number, event: FocusEvent]
  dragstart: [payload: number]
  dragend: [payload: number]
  'update:modelValue': [payload: number | number[]]
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const visibleMarker = ref<number | null>(null)

const value = computed({
  get () {
    return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
  },
  set (value) {
    emits('update:modelValue', value ? (value.length === 2 ? value : value[0]) : value)
  }
})

const onFocus = ({ index, value }: { index: number, value: number}, e: FocusEvent) => {
  emits('focus', value, e)
  visibleMarker.value = index
}
const onBlur = ({ value }: { value: number}, e: FocusEvent) => {
  emits('blur', value, e)
  visibleMarker.value = null
}
</script>
