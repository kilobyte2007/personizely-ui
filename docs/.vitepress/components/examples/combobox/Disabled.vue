<template>
  <Combobox
    v-model="value"
    :options="options"
    class="w-64"
    disabled
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Combobox from '@/components/ui/combobox'

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
