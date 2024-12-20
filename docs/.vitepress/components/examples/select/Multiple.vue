<template>
  <Select
    v-model="value"
    :options="options"
    multiple
    class="w-64"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@/components/ui/select'

const value = ref([])
const options = [
  {
    label: 'Red',
    value: 1
  },
  {
    label: 'Green',
    value: 2
  },
  {
    label: 'Blue',
    value: 3
  }
]
</script>
