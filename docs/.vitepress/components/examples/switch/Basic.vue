<template>
  <Switch v-model="value" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Switch from '@/components/ui/switch'

const value = ref(false)
</script>
