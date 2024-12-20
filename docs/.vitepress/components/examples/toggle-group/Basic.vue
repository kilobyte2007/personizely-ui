<template>
  <TooltipProvider :delay-duration="100">
    <ToggleGroup v-model="value" :items="items" type="single" />
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ToggleGroup } from '@/components/ui/toggle-group'
import { ref } from 'vue'
import { TooltipProvider } from '@/components/ui/tooltip'

const value = ref('left')

const items = [
  { value: 'left', icon: 'align-left', label: 'Left' },
  { value: 'center', icon: 'align-center', label: 'Center' },
  { value: 'right', icon: 'align-right', label: 'Right' }
]
</script>
