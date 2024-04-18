<template>
  <RadioGroup v-model="value" :options="options" disabled />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import RadioGroup from '@/components/ui/radio-group'

const value = ref(null)
const options = [
  {
    label: 'Red',
    value: 'red',
    help: 'This is a help message'
  },
  {
    label: 'Green',
    value: 'green',
    help: 'This is a help message'
  },
  {
    label: 'Blue',
    value: 'blue',
    help: 'This is a help message'
  }
]
</script>
