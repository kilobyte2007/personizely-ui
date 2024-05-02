<template>
  <Select v-model="value" :options="options" class="w-64" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Select from '@/components/ui/select'

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
