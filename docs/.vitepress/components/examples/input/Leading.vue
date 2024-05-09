<template>
  <Input
    v-model="value"
    placeholder="Cost"
    type="number"
    :min="0"
    class="max-w-xs"
  >
    <template #leading>
      <span class="block text-sm text-center w-4">
        $
      </span>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const value = ref()
</script>
