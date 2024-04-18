<template>
  <Slider v-model="value" disabled />
</template>
<script setup lang="ts">
import Slider from '@/components/ui/slider'
import { ref } from 'vue'

const value = ref(10)
</script>
