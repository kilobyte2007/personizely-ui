<template>
  <DateRangePicker v-model="value" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DateRangePicker from '@/components/ui/date-range-picker'
import type { DateRange } from 'radix-vue'
import { CalendarDate } from '@internationalized/date'

const value = ref<DateRange>({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 })
})
</script>
