<template>
  <Alert v-model:visible="visible" @dismiss="reset()">
    Hi everybody! This is the default alert.
  </Alert>
</template>
<script setup lang="ts">
import { Alert } from '@/components/ui/alert'
import { ref } from 'vue'

const visible = ref(true)
const reset = () => {
  setTimeout(() => {
    visible.value = true
  }, 2000)
}
</script>
