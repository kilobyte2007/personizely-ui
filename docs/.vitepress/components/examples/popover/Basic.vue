<template>
  <Popover>
    <template #trigger>
      <Button>Show popover</Button>
    </template>

    This is the popover's body.
  </Popover>
</template>
<script setup lang="ts">
import { Popover } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
</script>
