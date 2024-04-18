<template>
  <Icon :icon="`${iconSet}:${icon}`" :aria-label="ariaLabel" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{
  icon: string,
  iconSet?: string,
  ariaLabel?: string | null
}>(), {
  iconSet: 'lucide',
  ariaLabel: null
})
</script>
