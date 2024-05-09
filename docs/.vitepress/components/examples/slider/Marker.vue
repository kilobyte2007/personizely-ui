<template>
  <Slider v-model="value" show-marker />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const value = ref(10)
</script>
