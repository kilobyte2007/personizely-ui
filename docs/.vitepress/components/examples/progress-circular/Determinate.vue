<template>
  <ProgressCircular
    :model-value="progress"
    class="w-12 h-12"
  />
</template>
<script setup lang="ts">
import { ProgressCircular } from '@/components/ui/progress-circular'

const progress = 75
</script>
