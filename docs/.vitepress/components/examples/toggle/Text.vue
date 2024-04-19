<template>
  <Toggle v-model:pressed="value">
    Bold
  </Toggle>
</template>

<script setup lang="ts">
import Toggle from '@/components/ui/toggle'
import { ref } from 'vue'

const value = ref(false)
</script>
