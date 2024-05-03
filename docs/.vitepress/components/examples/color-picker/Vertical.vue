<template>
  <Color v-model="value" orientation="vertical" />
</template>

<script setup lang="ts">
import { Color } from '@/components/ui/color-picker'
import { ref } from 'vue'

const value = ref('#FF9900')
</script>
