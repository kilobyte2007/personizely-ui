<template>
  <Popover class="p-0">
    <template #trigger>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
        )"
      >
        <template #icon>
          <CalendarIcon class="size-4" />
        </template>
        {{ modelValue ? formatter.format(modelValue.toDate(getLocalTimeZone())) : placeholder }}
      </Button>
    </template>
    <Calendar v-model="modelValue" initial-focus />
  </Popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import Calendar from '@/components/ui/calendar'
import Button from '@/components/ui/button'
import Popover from '@/components/ui/popover'
import { cn } from '@/utils/tailwind'

const modelValue = defineModel<DateValue>()
withDefaults(defineProps<{
  placeholder?: string
  formatter?: DateFormatter
}>(), {
  placeholder: 'Pick a date',
  formatter: () => new DateFormatter('en-US', {
    dateStyle: 'long'
  })
})
</script>
