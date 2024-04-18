<template>
  <CheckboxGroup v-model="value" :options="options" horizontal />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CheckboxGroup from '@/components/ui/checkbox-group'

const value = ref([])
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
