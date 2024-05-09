<template>
  <ToggleGroup v-model="value" :items="items" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from '@/components/ui/toggle-group'

const value = ref([])

const items = [
  { value: 'bold', icon: 'bold', label: 'Bold' },
  { value: 'italic', icon: 'italic', label: 'Italic' },
  { value: 'underline', icon: 'underline', label: 'Underline' }
]
</script>
