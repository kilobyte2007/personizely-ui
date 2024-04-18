<template>
  <Switch v-model="value" label="This is a label" disabled />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Switch from '@/components/ui/switch'

const value = ref(false)
</script>
