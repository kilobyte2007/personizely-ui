<template>
  <Checkbox v-model="value" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

const value = ref(false)
</script>
