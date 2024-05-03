<template>
  <div class="flex flex-col gap-1">
    <slot v-bind="{ id }" />
    <label :for="id" class="text-center text-xs">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'radix-vue'

const props = defineProps<{
  label: string
}>()

const id = useId(props.label.toLowerCase())
</script>
