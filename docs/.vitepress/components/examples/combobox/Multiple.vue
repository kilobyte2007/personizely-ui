<template>
  <Combobox
    v-model="value"
    multiple
    :options="options"
    class="w-64"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Combobox } from '@/components/ui/combobox'

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
