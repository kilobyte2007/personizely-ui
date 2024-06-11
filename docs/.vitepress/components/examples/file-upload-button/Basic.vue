<template>
  <FileUploadButton
    accept=".jpeg"
    name="file"
    variant="secondary"
    icon="import"
    @change="onChange"
  >
    Upload files
  </FileUploadButton>
</template>

<script setup lang="ts">
import { FileUploadButton } from '@/components/ui/file-upload-button'

const onChange = (event: Event) => {
  console.log(event)
}
</script>
