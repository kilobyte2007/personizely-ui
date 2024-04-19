<template>
  <ToggleGroup v-model="value" :items="items" />
</template>

<script setup lang="ts">
import ToggleGroup from '@/components/ui/toggle-group'
import { ref } from 'vue'

const value = ref(null)

const items = [
  { value: 'bold', icon: 'bold', label: 'Bold' },
  { value: 'italic', icon: 'italic', label: 'Italic' },
  { value: 'underline', icon: 'underline', label: 'Underline' }
]
</script>
