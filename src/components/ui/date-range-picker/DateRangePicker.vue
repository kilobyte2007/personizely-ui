<template>
  <Popover v-model:open="isOpen" class="p-0">
    <template #trigger>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue.start && 'text-muted-foreground',
          $props.class
        )"
      >
        <template #icon>
          <CalendarIcon class="size-3" />
        </template>
        <template v-if="modelValue.start">
          <template v-if="modelValue.end">
            {{ formatter.format(modelValue.start.toDate(getLocalTimeZone())) }} - {{ formatter.format(modelValue.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ formatter.format(modelValue.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          {{ placeholder }}
        </template>
      </Button>
    </template>
    <div class="flex">
      <div v-if="presets.length > 0" class="p-3 flex flex-col justify-stretch gap-2">
        <Button
          v-for="preset in presets"
          :key="preset.label"
          size="sm"
          :aria-selected="isSelectedPreset(preset.value)"
          :variant="isSelectedPreset(preset.value) ? 'secondary' : 'ghost'"
          class="justify-start min-w-28"
          @click="() => {
            dateRange = preset.value
            id += 1
          }"
        >
          {{ preset.label }}
        </Button>
      </div>
      <RangeCalendar
        v-bind="omit(forwarded, ['class', 'placeholder', 'formatter', 'presets', 'modelValue'])"
        :key="id"
        v-model="dateRange"
        :number-of-months="2"
        :prevent-deselect="true"
      />
    </div>
    <div class="p-3 flex justify-end gap-2">
      <Button variant="ghost" size="sm" @click="reset">
        Reset
      </Button>
      <Button :disabled="!dateRange.start && !dateRange.end" size="sm" @click="apply">
        Apply
      </Button>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'
import { type DateRange, type RangeCalendarRootProps, useForwardProps } from 'radix-vue'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { cn } from '@/utils/tailwind'
import { type HTMLAttributes, ref, watch } from 'vue'
import omit from 'lodash/omit'

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<{
  placeholder?: string
  formatter?: DateFormatter
  class?: HTMLAttributes['class']
  modelValue: DateRange
  presets?: Array<{ label: string, value: DateRange }>
} & Omit<RangeCalendarRootProps, 'placeholder'>>(), {
  placeholder: 'Pick a date range',
  initialFocus: false,
  defaultValue: () => ({ start: undefined, end: undefined }),
  numberOfMonths: 2,
  presets: () => [],
  formatter: () => new DateFormatter('en-US', {
    dateStyle: 'long'
  })
})

const isOpen = ref(false)
const id = ref(1)

const dateRange = ref<DateRange>({
  start: props.modelValue.start,
  end: props.modelValue.end
})

watch(() => props.modelValue, (to) => {
  dateRange.value = {
    start: to.start,
    end: to.end
  }
})

const reset = () => {
  emit('update:modelValue', props.defaultValue)
  isOpen.value = false
}
const apply = () => {
  emit('update:modelValue', dateRange.value)
  isOpen.value = false
}

const isSelectedPreset = (value: DateRange) => {
  const { end, start } = dateRange.value

  return dateRange.value.start
    ? value.start?.compare(start) === 0
    : start === value.start
    && end
      ? value.end?.compare(end) === 0
      : end === value.end
}

const forwarded = useForwardProps(props)
</script>
