<template>
  <DateRangePicker v-model="value" :presets="presets" :max-value="now(getLocalTimeZone())" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import type { DateRange } from 'reka-ui'
import { now, getLocalTimeZone } from '@internationalized/date'

const value = ref<DateRange>({
  start: undefined,
  end: undefined
})

const presets = [
  {
    label: '24 hours',
    value: { start: now(getLocalTimeZone()).subtract({ hours: 24 }), end: now(getLocalTimeZone()) }
  },
  {
    label: 'Last week',
    value: { start: now(getLocalTimeZone()).subtract({ days: 7 }), end: now(getLocalTimeZone()) }
  },
  {
    label: 'Last month',
    value: { start: now(getLocalTimeZone()).subtract({ days: 31 }), end: now(getLocalTimeZone()) }
  },
  {
    label: 'Last quarter',
    value: { start: now(getLocalTimeZone()).subtract({ months: 4 }), end: now(getLocalTimeZone()) }
  },
  {
    label: 'Last year',
    value: { start: now(getLocalTimeZone()).subtract({ years: 1 }), end: now(getLocalTimeZone()) }
  }
]
</script>
