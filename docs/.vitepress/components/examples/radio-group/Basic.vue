<template>
  <RadioGroup v-model="value" :options="options" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup } from '@/components/ui/radio-group'

const value = ref(null)
const options = [
  {
    label: 'Red',
    value: 'red'
  },
  {
    label: 'Green',
    value: 'green'
  },
  {
    label: 'Blue',
    value: 'blue'
  }
]
</script>
