<template>
  <Textarea v-model="value" />

  {{ value }}
</template>

<script setup lang="ts">
import Textarea from '@/components/ui/textarea'
import { ref } from 'vue'

const value = ref()
</script>
