<template>
  <div class="flex gap-4">
    <Icon
      v-for="icon in ['cog', 'home', 'book-education-outline', 'database-arrow-right', 'hair-dryer', 'home-percent', 'image-filter-drama', 'lightbulb-night']"
      :key="icon"
      :icon="icon"
      class="w-6 h-6"
      icon-set="mdi"
    />
  </div>
</template>
<script setup lang="ts">
import Icon from '@/components/ui/icon'
</script>
