<template>
  <ToggleGroup v-model="value" :items="items" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from '@/components/ui/toggle-group'

const value = ref([])

const items = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' }
]
</script>
