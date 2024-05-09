<template>
  <div class="h-64">
    <Slider v-model="value" orientation="vertical" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const value = ref(10)
</script>
