<template>
  <Combobox v-model="value" :options="options" class="w-64">
    <template v-if="value" #label="{ option }">
      <span class="flex items-center">
        <span class="size-3 mr-2 inline-block rounded-full opacity-40" :style="{ backgroundColor: option.value }" /> {{ option.label }}
      </span>
    </template>
    <template #option="{ option }">
      <span class="flex items-center">
        <span class="size-3 mr-2 inline-block rounded-full opacity-40" :style="{ backgroundColor: option.value }" /> {{ option.label }}
      </span>
    </template>
  </Combobox>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Combobox } from '@/components/ui/combobox'

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
