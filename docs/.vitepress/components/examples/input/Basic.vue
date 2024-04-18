<template>
  <Input v-model="value" />
</template>

<script setup lang="ts">
import Input from '@/components/ui/input'
import { ref } from 'vue'

const value = ref()
</script>
