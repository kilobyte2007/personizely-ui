<template>
  <Textarea
    :model-value="'This is a value you can read but not edit.'"
    readonly
  />
</template>

<script setup lang="ts">
import Textarea from '@/components/ui/textarea'
</script>
