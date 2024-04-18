<template>
  <Input
    v-model="value"
    placeholder="Cost"
    type="number"
    :min="0"
  >
    <template #trailing>
      <div class="text-[0.6rem]">
        USD
      </div>
    </template>
  </Input>
</template>

<script setup lang="ts">
import Input from '@/components/ui/input'
import { ref } from 'vue'

const value = ref()
</script>
