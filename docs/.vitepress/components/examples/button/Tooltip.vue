<template>
  <TooltipProvider :delay-duration="100">
    <div class="flex gap-2">
      <Button
        v-for="size in sizes"
        :key="size"
        :size="size"
        tooltip="Surprise!"
      >
        Hover for more
      </Button>
    </div>
  </TooltipProvider>
</template>
<script setup lang="ts">
import Button from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'

const sizes = ['lg', 'md', 'sm', 'xs', 'xxs']
</script>
