<template>
  <Pagination
    v-model:page="page"
    :total="100"
    :sibling-count="1"
    :items-per-page="10"
    show-edges
    :default-page="2"
  />
</template>

<script setup lang="ts">
import { Pagination } from '@/components/ui/pagination'
import { ref } from 'vue'

const page = ref(1)
</script>
