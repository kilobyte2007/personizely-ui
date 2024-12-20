<template>
  <div class="flex gap-4">
    <Button
      v-for="size in sizes"
      :key="size"
      :size="size"
      variant="destructive"
    >
      Delete
    </Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'

const sizes = ['lg', 'md', 'sm', 'xs', '2xs']
</script>
