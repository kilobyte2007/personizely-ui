<template>
  <ToggleGroup v-model="value" :items="items" />
</template>

<script setup lang="ts">
import ToggleGroup from '@/components/ui/toggle-group'
import { ref } from 'vue'

const value = ref([])

const items = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' }
]
</script>
