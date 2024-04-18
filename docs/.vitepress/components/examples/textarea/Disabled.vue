<template>
  <Textarea
    v-model="value"
    placeholder="Type in your message here."
    disabled
  />
</template>

<script setup lang="ts">
import Textarea from '@/components/ui/textarea'
import { ref } from 'vue'

const value = ref()
</script>
