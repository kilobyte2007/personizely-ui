<template>
  <PopoverTrigger as-child>
    <slot />
  </PopoverTrigger>
</template>

<script setup lang="ts">
import {
  PopoverTrigger
} from 'radix-vue'
import { provide } from 'vue'


provide('hasDropdown', true)
</script>
