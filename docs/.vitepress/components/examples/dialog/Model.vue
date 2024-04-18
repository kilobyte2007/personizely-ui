<template>
  <Button @click="open = true">
    Open dialog
  </Button>
  <Dialog v-model:open="open" title="This is a title" description="We also have a brief description.">
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
import { ref } from 'vue'

const open = ref(false)
</script>
