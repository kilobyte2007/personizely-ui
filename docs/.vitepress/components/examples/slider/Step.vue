<template>
  <Slider v-model="value" :step="25" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const value = ref(25)
</script>
