<template>
  <DialogRoot v-bind="forwarded">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogContent :class="props.class" @hide="$emit('hide')">
      <DialogHeader>
        <DialogTitle v-if="title || $slots.title">
          <slot name="title">
            {{ title }}
          </slot>
        </DialogTitle>
        <DialogDescription v-if="description || $slots.description">
          <slot name="description">
            {{ description }}
          </slot>
        </DialogDescription>
      </DialogHeader>

      <div v-if="$slots.default" class="text-sm overflow-auto p-2">
        <slot />
      </div>

      <DialogFooter v-if="$slots.footer">
        <slot name="footer" />
      </DialogFooter>

      <DialogClose
        v-if="!removeCloseButton"
        as-child
        class="absolute right-4 top-4"
      >
        <Button
          size="sm"
          icon="x"
          variant="ghost"
        />
      </DialogClose>
    </DialogContent>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogClose,
  DialogRoot,
  type DialogRootEmits,
  type DialogRootProps
} from 'reka-ui'
import { Button } from '@/components/ui/button'
import DialogTrigger from './DialogTrigger.vue'
import DialogHeader from './DialogHeader.vue'
import DialogTitle from './DialogTitle.vue'
import DialogDescription from './DialogDescription.vue'
import DialogContent from './DialogContent.vue'
import DialogFooter from './DialogFooter.vue'
import type { HTMLAttributes } from 'vue'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'

const props = withDefaults(defineProps<DialogRootProps & {
  class?: HTMLAttributes['class'],
  title?: string,
  description?: string,
  removeCloseButton?: boolean
}>(), {
  removeCloseButton: false
})
const emits = defineEmits<DialogRootEmits & {
  hide: []
}>()

const delegatedProps = useDelegatedProps(props, ['class', 'title', 'description', 'removeCloseButton'])
const delegatedEmits = useEmitAsProps(emits, ['hide'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)
</script>
