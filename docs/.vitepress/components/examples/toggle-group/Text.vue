<template>
  <TooltipProvider :delay-duration="100">
    <ToggleGroup v-model="value" :items="items" />
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { TooltipProvider } from '@/components/ui/tooltip'

const value = ref([])

const items = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'underline', label: 'Underline' }
]
</script>
