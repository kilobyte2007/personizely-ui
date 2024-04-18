<template>
  <AlertDialog
    title="Are you absolutely sure?"
    description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
    @confirm="confirm"
  >
    <template #trigger>
      <Button>Show alert</Button>
    </template>
  </AlertDialog>
</template>

<script setup lang="ts">
import AlertDialog from '@/components/ui/alert-dialog'
import Button from '@/components/ui/button'

const confirm = () => {
  alert('Action confirmed!')
}
</script>
