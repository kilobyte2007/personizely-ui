<template>
  <Card title="This is a card" description="A card can have a description" class="w-72">
    <div class="text-sm">
      This is the card body.
    </div>

    <template #footer>
      <div class="flex gap-2 justify-between w-full">
        <Button variant="secondary">
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
</script>
