<template>
  <Popover class="p-0">
    <template #trigger>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
          props.class
        )"
      >
        <template #icon>
          <CalendarIcon class="size-3 min-w-3" />
        </template>
        <slot v-if="modelValue" name="label">
          <span class="truncate">{{ formatter.format(modelValue.toDate(getLocalTimeZone())) }}</span>
        </slot>
        <template v-else>
          <span class="truncate">{{ placeholder }}</span>
        </template>
      </Button>
    </template>
    <Calendar v-bind="forwarded" v-model="modelValue" initial-focus />
  </Popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { cn } from '@/utils/tailwind'
import { type CalendarRootProps, useForwardProps } from 'reka-ui'
import { type HTMLAttributes } from 'vue'
import { useDelegatedProps } from '@/composables/use-delegated-props'

const modelValue = defineModel<DateValue>()
const props = withDefaults(defineProps<{
  placeholder?: string
  class?: HTMLAttributes['class']
  formatter?: DateFormatter
} & Omit<CalendarRootProps, 'placeholder' | 'modelValue'>>(), {
  placeholder: 'Pick a date',
  formatter: () => new DateFormatter('en-US', {
    dateStyle: 'long'
  })
})

const delegatedProps = useDelegatedProps(props, ['class', 'placeholder', 'formatter', 'modelValue'])
const forwarded = useForwardProps(delegatedProps)
</script>
