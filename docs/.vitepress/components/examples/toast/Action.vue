<template>
  <Button
    @click="toast({
      title: 'In progress...',
      description: 'Your export is being processed.',
      action: h(ToastAction, {
        altText: 'Undo',
        onClick () {
          dismiss()
        }
      }, {
        default: () => 'Undo',
      })
    })"
  >
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ToastAction, useToast } from '@/components/ui/toast'
import { h } from 'vue'

const { toast, dismiss } = useToast()
</script>
