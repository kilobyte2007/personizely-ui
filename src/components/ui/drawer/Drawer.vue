<template>
  <DialogRoot v-bind="forwarded">
    <DrawerTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DrawerTrigger>

    <DrawerContent
      :side="side"
      :class="props.class"
      :disable-overlay="disableOverlay"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @hide="$emit('hide')"
    >
      <DrawerHeader v-if="$slots.header || $slots.title || title">
        <slot name="header">
          <DrawerTitle
            v-if="$slots.title || title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </DrawerTitle>

          <DrawerDescription
            v-if="$slots.description || description"
          >
            <slot name="description">
              {{ description }}
            </slot>
          </DrawerDescription>
        </slot>
      </DrawerHeader>

      <div class="text-sm max-h-[90dvh] overflow-auto px-6 py-1">
        <slot />
      </div>

      <DrawerFooter v-if="$slots.footer">
        <slot name="footer" />
      </DrawerFooter>

      <DialogClose as-child class="absolute right-4 top-4">
        <Button icon="x" variant="ghost" size="sm" />
      </DialogClose>
    </DrawerContent>
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
import type { HTMLAttributes } from 'vue'
import DrawerTrigger from './DrawerTrigger.vue'
import DrawerContent from './DrawerContent.vue'
import DrawerHeader from './DrawerHeader.vue'
import DrawerFooter from './DrawerFooter.vue'
import DrawerTitle from './DrawerTitle.vue'
import DrawerDescription from './DrawerDescription.vue'
import { type DrawerVariants } from './'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'

const props = withDefaults(defineProps<DialogRootProps & {
  class?: HTMLAttributes['class']
  title?: string
  side?: DrawerVariants['side']
  description?: string
  disableOverlay?: boolean
  disableOutsidePointerEvents?: boolean
}>(), {
  side: 'right',
  disableOverlay: false,
  disableOutsidePointerEvents: true
})
const emits = defineEmits<DialogRootEmits & {
  hide: []
}>()

const delegatedProps = useDelegatedProps(props, ['class', 'title', 'side', 'description', 'disableOverlay', 'disableOutsidePointerEvents'])
const delegatedEmits = useEmitAsProps(emits, ['hide'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)
</script>
