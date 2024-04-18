<template>
  <div class="flex flex-col gap-5 items-center">
    <Button @click="open = true">
      Show popover
    </Button>

    <Popover v-model:open="open" side="right">
      <template #trigger>
        <Avatar fallback="SC" alt="Sergiu Cazac" />
      </template>

      This is the popover's body.
    </Popover>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Popover from '@/components/ui/popover'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'

const open = ref(false)
</script>
