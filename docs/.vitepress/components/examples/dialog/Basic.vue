<template>
  <Dialog title="This is a title" description="We also have a brief description.">
    <template #trigger>
      <Button>Open dialog</Button>
    </template>

    This is the dialog's body.

    <template #footer>
      <Button variant="secondary">
        Cancel
      </Button>
      <Button>Save</Button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from '@/components/ui/dialog'
import Button from '@/components/ui/button'
</script>
