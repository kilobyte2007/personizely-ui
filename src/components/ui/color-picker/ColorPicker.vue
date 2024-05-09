<template>
  <Popover>
    <template #trigger>
      <Button variant="ghost">
        <template #icon>
          <span class="relative size-4">
            <Checkboard :size="4" class="absolute size-4 rounded-full inset-0" />
            <span class="size-4 rounded-full absolute inset-0" :style="{ backgroundColor: modelValue }" />
          </span>
        </template>
      </Button>
    </template>

    <Color v-model="modelValue" />
  </Popover>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import Color from './Color.vue'
import Checkboard from './Checkboard.vue'

const modelValue = defineModel<string>()
</script>
