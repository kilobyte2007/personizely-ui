<template>
  <DropdownCheckboxGroupMenu
    v-model="value"
    :items="items"
    label="Devices"
  >
    <template #trigger>
      <Button>Select devices</Button>
    </template>
  </DropdownCheckboxGroupMenu>
</template>
<script setup lang="ts">
import { DropdownCheckboxGroupMenu } from '@/components/ui/dropdown-menu'
import Button from '@/components/ui/button'
import { ref } from 'vue'

const items = [
  {
    label: 'Mobile',
    value: 'mobile'
  },
  {
    label: 'Desktop',
    value: 'desktop'
  },
  {
    label: 'Wearable',
    value: 'wearable'
  }
]

const value = ref(['mobile'])
</script>
