<template>
  <Autocomplete v-model="value" :options="options" class="w-64" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Autocomplete } from '@/components/ui/autocomplete'

const value = ref(null)
const options = [
  {
    label: 'Red',
    value: 'Red'
  },
  {
    label: 'Green',
    value: 'Green'
  },
  {
    label: 'Blue',
    value: 'Blue'
  }
]
</script>
