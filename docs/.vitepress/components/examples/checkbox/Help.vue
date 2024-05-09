<template>
  <Checkbox v-model="value" label="This is a label" help="This is a help message for additional information." />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

const value = ref(false)
</script>
