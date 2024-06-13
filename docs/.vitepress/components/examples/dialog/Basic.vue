<template>
  <Dialog title="This is a title" description="We also have a brief description.">
    <template #trigger>
      <Button>Open dialog</Button>
    </template>

    This is the dialog's body.

    <Combobox v-model="value" :options="options" class="w-64" />

    <template #footer>
      <Button variant="secondary">
        Cancel
      </Button>
      <Button>Save</Button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { Combobox } from '@/components/ui/combobox'

const value = ref(null)
const options = [
  {
    label: 'Red',
    value: 'red'
  },
  {
    label: 'Green',
    value: 'green'
  },
  {
    label: 'Blue',
    value: 'blue'
  }
]
</script>
