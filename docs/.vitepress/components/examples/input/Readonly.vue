<template>
  <Input
    v-model="value"
    readonly
    class="max-w-xs"
  />
</template>

<script setup lang="ts">
import Input from '@/components/ui/input'
const value = 'This is a value you can read but not edit.'
</script>
