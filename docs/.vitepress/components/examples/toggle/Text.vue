<template>
  <TooltipProvider :delay-duration="100">
    <Toggle v-model="value">
      Bold
    </Toggle>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
import { ref } from 'vue'
import { TooltipProvider } from '@/components/ui/tooltip'

const value = ref(false)
</script>
