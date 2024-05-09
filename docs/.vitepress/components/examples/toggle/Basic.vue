<template>
  <Toggle v-model:pressed="value" aria-label="Toggle bold" icon="bold" />
</template>

<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
import { ref } from 'vue'

const value = ref(false)
</script>
