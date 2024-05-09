<template>
  <Textarea
    v-model="value"
    placeholder="Type in your message here."
    disabled
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/textarea'

const value = ref()
</script>
