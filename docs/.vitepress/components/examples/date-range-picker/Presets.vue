<template>
  <DateRangePicker v-model="value" :presets="presets" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import type { DateRange } from 'radix-vue'
import { CalendarDateTime } from '@internationalized/date'

const value = ref<DateRange>({
  start: undefined,
  end: undefined
})

const now = () => new CalendarDateTime(new Date().getFullYear(), new Date().getMonth(), new Date().getDay(), new Date().getHours(), new Date().getMinutes())

const presets = [
  {
    label: '24 hours',
    value: { start: now().subtract({ hours: 24 }), end: now() }
  },
  {
    label: 'Last week',
    value: { start: now().subtract({ days: 7 }), end: now() }
  },
  {
    label: 'Last month',
    value: { start: now().subtract({ days: 31 }), end: now() }
  },
  {
    label: 'Last quarter',
    value: { start: now().subtract({ months: 4 }), end: now() }
  },
  {
    label: 'Last year',
    value: { start: now().subtract({ years: 1 }), end: now() }
  },
  {
    label: 'Overall',
    value: { start: undefined, end: undefined }
  }
]
</script>
