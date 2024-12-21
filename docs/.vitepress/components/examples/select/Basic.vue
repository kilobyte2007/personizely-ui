<template>
  <Select v-model="value"
    :options="options"
    :keys="{ value: 'id', label: 'name' }"
    class="w-64"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@/components/ui/select'

const value = ref(null)
const options = [
  {
    name: 'Red',
    id: 1
  },
  {
    name: 'Green',
    id: 2
  },
  {
    name: 'Blue',
    id: 3
  }
]
</script>
