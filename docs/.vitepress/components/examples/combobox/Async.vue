<template>
  <Combobox
    v-model="value"
    :options="options"
    :loading="loading"
    disable-filter
    class="w-64"
    @update:search-term="search"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Combobox } from '@/components/ui/combobox'

const value = ref(null)
const loading = ref(false)
const options = ref([])

const search = (value: string) => {
  console.log(`Imitating a search with ${value}`)

  loading.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = value
        ? [
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
        : []

      options.value = result
      loading.value = false
      resolve(result)
    }, 1000)
  })
}
</script>
