<template>
  <div class="flex flex-col gap-10 items-center">
    <Gradient v-model="value" class="max-w-xs" />
    <div class="w-32 h-24 rounded-md" :style="{ backgroundImage: value }" />
  </div>
</template>

<script setup lang="ts">
import { Gradient } from '@/components/ui/color-picker'
import { ref } from 'vue'

const value = ref('linear-gradient(90deg, #c03333 0%, #0000ff 100%)')
</script>
