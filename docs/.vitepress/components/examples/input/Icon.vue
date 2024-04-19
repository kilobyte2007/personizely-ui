<template>
  <Input
    v-model="value"
    icon="search"
    placeholder="Search..."
    class="max-w-xs"
  />
</template>

<script setup lang="ts">
import Input from '@/components/ui/input'
import { ref } from 'vue'

const value = ref()
</script>
