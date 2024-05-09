<template>
  <div class="flex gap-4">
    <Icon
      v-for="icon in ['save', 'home', 'info', 'cog', 'message-circle-x', 'activity', 'building', 'crosshair']"
      :key="icon"
      class="w-6 h-6"
      :icon="icon"
    />
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@/components/ui/icon'
</script>
