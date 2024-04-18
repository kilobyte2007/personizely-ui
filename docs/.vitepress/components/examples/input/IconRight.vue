<template>
  <Input
    v-model="value"
    icon="search"
    placeholder="Search..."
    icon-position="right"
  />
</template>

<script setup lang="ts">
import Input from '@/components/ui/input'
import { ref } from 'vue'

const value = ref()
</script>
