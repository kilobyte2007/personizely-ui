<template>
  <Button @click="toast({ title: 'Error', variant: 'destructive', description: 'Item not added added!'})">
    Show toast
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()
</script>
