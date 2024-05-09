<template>
  <div class="flex gap-2">
    <Button
      v-for="size in sizes"
      :key="size"
      :size="size"
    >
      Basic button
    </Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'

const sizes = ['lg', 'md', 'sm', 'xs', 'xxs']
</script>
