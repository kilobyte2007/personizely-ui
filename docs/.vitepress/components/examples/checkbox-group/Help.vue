<template>
  <CheckboxGroup v-model="value" :options="options" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CheckboxGroup from '@/components/ui/checkbox-group'

const value = ref([])
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
