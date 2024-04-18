<template>
  <Popover class="p-0">
    <template #trigger>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
          $props.class
        )"
      >
        <template #icon>
          <CalendarIcon class="size-4" />
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
    <RangeCalendar
      v-model="modelValue"
      initial-focus
      :number-of-months="2"
      :placeholder="modelValue.start"
      @update:start-value="(startDate: DateValue | undefined) => modelValue.start = startDate"
    />
  </Popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone
} from '@internationalized/date'
import type { DateRange } from 'radix-vue'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import RangeCalendar from '@/components/ui/range-calendar'
import Button from '@/components/ui/button'
import Popover from '@/components/ui/popover'
import { cn } from '@/utils'
import type { HTMLAttributes } from 'vue'

const modelValue = defineModel<DateRange>({
  required: true
})
withDefaults(defineProps<{
  placeholder?: string
  formatter?: DateFormatter
  class?: HTMLAttributes['class']
}>(), {
  placeholder: 'Pick a date range',
  formatter: () => new DateFormatter('en-US', {
    dateStyle: 'long'
  })
})
</script>
