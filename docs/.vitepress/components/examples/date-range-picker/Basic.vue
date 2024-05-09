<template>
  <DateRangePicker v-model="value" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import type { DateRange } from 'radix-vue'

const value = ref<DateRange>({
  start: undefined,
  end: undefined
})
</script>
