<template>
  <form :class="cn('flex flex-col gap-4', props.class)">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { cn } from '@/utils/tailwind'
import type { SelectRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<Omit<SelectRootProps, 'modelValue'> & {
  class? : HTMLAttributes['class']
}>()
</script>
