<template>
  <DropdownRadioGroupMenu
    v-model="value"
    :items="items"
    label="Report cadence"
  >
    <template #trigger>
      <Button>Select cadence</Button>
    </template>
  </DropdownRadioGroupMenu>
</template>
<script setup lang="ts">
import { DropdownRadioGroupMenu } from '@/components/ui/dropdown-menu'
import Button from '@/components/ui/button'
import { ref } from 'vue'

const items = [
  {
    label: 'Daily',
    value: 'daily'
  },
  {
    label: 'Weekly',
    value: 'weekly'
  },
  {
    label: 'Monthly',
    value: 'monthly'
  }
]

const value = ref('daily')
</script>
