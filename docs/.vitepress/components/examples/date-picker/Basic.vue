<template>
  <DatePicker v-model="value" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from '@/components/ui/date-picker'
import type { DateValue } from '@internationalized/date'

const value = ref<DateValue>()
</script>
