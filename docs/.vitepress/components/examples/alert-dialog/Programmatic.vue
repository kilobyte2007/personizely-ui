<template>
  <Button @click="confirm({ title: 'Are you sure?', description: 'Are you really, really sure?', onConfirm: () => action() })">
    Show alert
  </Button>
  <AlertDialogProvider />
</template>

<script setup lang="ts">
import { useAlertDialog, AlertDialogProvider } from '@/components/ui/alert-dialog'
import Button from '@/components/ui/button'

const { confirm } = useAlertDialog()
const action = () => {
  alert('Action confirmed!')
}
</script>
