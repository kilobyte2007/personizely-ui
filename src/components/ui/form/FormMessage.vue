<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="text-sm text-destructive group-[:has([disabled])]:opacity-70 group-[:has([disabled])]:cursor-not-allowed"
  />
</template>

<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from './useFormField'

const { name, formMessageId } = useFormField()
</script>
