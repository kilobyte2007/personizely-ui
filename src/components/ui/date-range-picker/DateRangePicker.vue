<template>
  <Popover class="p-0">
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
      <div v-if="presets.length > 0" class="p-4 flex flex-col justify-stretch gap-2">
        <Button
          v-for="preset in presets"
          :key="preset.label"
          :variant="isSelectedPreset(preset.value) ? 'secondary' : 'ghost'"
          class="justify-start min-w-32"
          @click="modelValue = preset.value"
        >
          {{ preset.label }}
        </Button>
      </div>
      <RangeCalendar
        v-model="modelValue"
        v-bind="omit(forwarded, ['class', 'placeholder', 'formatter', 'presets'])"
        initial-focus
        :number-of-months="2"
        @update:start-value="(startDate: DateValue | undefined) => modelValue.start = startDate"
      />
    </div>
  </Popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  CalendarDateTime
} from '@internationalized/date'
import { type DateRange, type RangeCalendarRootProps, useForwardProps } from 'radix-vue'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { cn } from '@/utils/tailwind'
import type { HTMLAttributes } from 'vue'
import omit from 'lodash/omit'

const modelValue = defineModel<DateRange>({
  required: true
})
const props = withDefaults(defineProps<{
  placeholder?: string
  formatter?: DateFormatter
  class?: HTMLAttributes['class']
  presets?: Array<{ label: string, value: DateRange }>
} & Omit<RangeCalendarRootProps, 'placeholder', 'modelValue'>>(), {
  placeholder: 'Pick a date range',
  presets: () => [],
  formatter: () => new DateFormatter('en-US', {
    dateStyle: 'long'
  })
})

const isSelectedPreset = (value: DateRange) => {
  return modelValue.value.start
    ? value.start?.compare(modelValue.value.start) === 0
    : modelValue.value.start === value.start
    && modelValue.value.end
      ? value.end?.compare(modelValue.value.end) === 0
      : modelValue.value.end === value.end
}

const forwarded = useForwardProps(props)
</script>
