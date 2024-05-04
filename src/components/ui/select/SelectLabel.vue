<template>
  <SelectLabel :class="cn('py-1.5 pl-2 pr-8 text-sm font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectLabel, type SelectLabelProps } from 'radix-vue'
import { cn } from '@/utils'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>
