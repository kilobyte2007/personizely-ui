<template>
  <Textarea v-model="value" />

  {{ value }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/textarea'

const value = ref()
</script>
