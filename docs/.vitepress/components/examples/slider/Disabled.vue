<template>
  <Slider v-model="value" disabled />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const value = ref(10)
</script>
