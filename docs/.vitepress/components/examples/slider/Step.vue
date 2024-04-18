<template>
  <Slider v-model="value" :step="25" />
</template>
<script setup lang="ts">
import Slider from '@/components/ui/slider'
import { ref } from 'vue'

const value = ref(25)
</script>
