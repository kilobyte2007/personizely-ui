<template>
  <AlertDialogRoot v-bind="omit(forwarded, ['title', 'description', 'onConfirm', 'onCancel'])">
    <AlertDialogTrigger as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <div class="flex flex-col gap-y-2 text-center sm:text-left">
        <AlertDialogTitle class="text-lg font-medium">
          <slot name="title">
            {{ title }}
          </slot>
        </AlertDialogTitle>
        <AlertDialogDescription class="text-sm text-muted-foreground">
          <slot name="description">
            {{ description }}
          </slot>
        </AlertDialogDescription>
      </div>
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2">
        <AlertDialogCancel as-child @click="$emit('cancel')">
          <Button variant="outline">
            Cancel
          </Button>
        </AlertDialogCancel>
        <AlertDialogAction as-child @click="$emit('confirm')">
          <Button>
            Confirm
          </Button>
        </AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import {
  type AlertDialogEmits,
  type AlertDialogProps,
  AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  useForwardPropsEmits
} from 'radix-vue'
import AlertDialogContent from './AlertDialogContent.vue'
import omit from 'lodash/omit'
import { Button } from '@/components/ui/button'

const props = defineProps<AlertDialogProps & {
  title: string
  description?: string
}>()
const emits = defineEmits<AlertDialogEmits & {
  confirm: []
  cancel: []
}>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
