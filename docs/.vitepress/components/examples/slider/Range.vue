<template>
  <Slider v-model="value" show-marker />
</template>
<script setup lang="ts">
import Slider from '@/components/ui/slider'
import { ref } from 'vue'

const value = ref([10, 90])
</script>
