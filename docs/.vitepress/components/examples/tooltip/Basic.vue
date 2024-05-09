<template>
  <TooltipProvider :delay-duration="100">
    <Tooltip>
      <template #trigger>
        <Button>Hover me</Button>
      </template>

      This is the tooltip body.
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
</script>
