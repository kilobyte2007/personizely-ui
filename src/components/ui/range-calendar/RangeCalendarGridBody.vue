<template>
  <RangeCalendarGridBody v-bind="props">
    <slot />
  </RangeCalendarGridBody>
</template>

<script lang="ts" setup>
import { RangeCalendarGridBody, type RangeCalendarGridBodyProps } from 'reka-ui'

const props = defineProps<RangeCalendarGridBodyProps>()
</script>
