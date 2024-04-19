<template>
  <Drawer title="This is a title" description="We also have a brief description." side="left">
    <template #trigger>
      <Button>Open drawer</Button>
    </template>

    This is the drawer's body.

    <template #footer>
      <Button variant="secondary">
        Cancel
      </Button>
      <Button>Save</Button>
    </template>
  </Drawer>
</template>
<script setup lang="ts">
import Button from '@/components/ui/button'
import Drawer from '@/components/ui/drawer'
</script>
