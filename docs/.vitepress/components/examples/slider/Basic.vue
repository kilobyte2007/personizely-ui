<template>
  <Slider v-model="value" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const value = ref(10)
</script>
