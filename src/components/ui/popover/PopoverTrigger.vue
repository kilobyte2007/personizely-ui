<template>
  <PopoverTrigger as-child>
    <slot />
  </PopoverTrigger>
</template>

<script setup lang="ts">
import {
  PopoverTrigger
} from 'reka-ui'
import { provide } from 'vue'


provide('hasDropdown', true)
</script>
