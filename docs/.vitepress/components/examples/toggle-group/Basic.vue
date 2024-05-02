<template>
  <ToggleGroup v-model="value" :items="items" />
</template>

<script setup lang="ts">
import ToggleGroup from '@/components/ui/toggle-group'
import { ref } from 'vue'

const value = ref(null)

const items = [
  { value: 'left', icon: 'align-left', label: 'Left' },
  { value: 'center', icon: 'align-center', label: 'Center' },
  { value: 'right', icon: 'align-right', label: 'Right' }
]
</script>
