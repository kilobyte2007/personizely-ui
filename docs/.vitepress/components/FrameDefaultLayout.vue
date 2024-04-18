<script setup>
import { ref, onMounted } from 'vue'
import { createApp } from 'whyframe:app'
const el = ref()

onMounted(() => {
  createApp(el.value)
})
</script>

<template>
  <div ref="el" class="vp-raw bg-gray-100/30 dark:bg-transparent p-5 overflow-auto items-center flex justify-center min-w-full h-screen" />
</template>
