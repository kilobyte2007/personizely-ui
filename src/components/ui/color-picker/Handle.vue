<template>
  <div
    :class="cn('absolute rounded-md cursor-pointer border-2 border-gray-300 shadow-sm scale-[1.2] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', $attrs.class)"
    role="presentation"
    tabindex="0"
    @keydown.up.prevent="$emit('up', $event)"
    @keydown.down.prevent="$emit('down', $event)"
    @keydown.right.prevent="$emit('up', $event)"
    @keydown.left.prevent="$emit('down', $event)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/tailwind'

defineEmits(['up', 'down'])
</script>
