<template>
  <Color v-model="value" class="max-w-xs" />
</template>

<script setup lang="ts">
import { Color } from '@/components/ui/color-picker'
import { ref } from 'vue'

const value = ref('#FF9500')
</script>
