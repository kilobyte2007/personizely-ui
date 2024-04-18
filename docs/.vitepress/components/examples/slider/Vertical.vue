<template>
  <div class="h-64">
    <Slider v-model="value" orientation="vertical" />
  </div>
</template>
<script setup lang="ts">
import Slider from '@/components/ui/slider'
import { ref } from 'vue'

const value = ref(10)
</script>
