<template>
  <Progress :model-value="70">
    <ProgressIndicator :model-value="85" class="bg-primary/20" />
  </Progress>
</template>

<script setup lang="ts">
import { Progress, ProgressIndicator } from '@/components/ui/progress'
</script>
