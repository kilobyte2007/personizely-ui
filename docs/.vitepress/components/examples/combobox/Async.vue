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

const fetch = (search?: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Gray'].filter(option => !search || option.toLowerCase().includes(search.toLowerCase()))

      options.value = result
      resolve(result)
    }, 200)
  })
}

const search = (value: string) => {
  console.log(`Imitating a search with ${value}`)

  loading.value = true
  fetch(value).then(() => {
    loading.value = false
  })
}
</script>
