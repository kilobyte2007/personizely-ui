<template>
  <Alert
    v-model:visible="visible"
    title="Hey there!"
    type="success"
    @dismiss="reset()"
  >
    This is an alert with a title.
  </Alert>
</template>
<script setup lang="ts">
import Alert from '@/components/ui/alert'
import { ref } from 'vue'

const visible = ref(true)
const reset = () => {
  setTimeout(() => {
    visible.value = true
  }, 2000)
}
</script>
