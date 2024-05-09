<template>
  <DialogRoot v-bind="omit(forwarded, ['title', 'description', 'side'])">
    <DrawerTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DrawerTrigger>

    <DrawerContent :side="side">
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

      <div class="text-sm max-h-[90dvh] overflow-auto">
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
  type DialogRootProps,
  useForwardPropsEmits
} from 'radix-vue'
import { Button } from '@/components/ui/button'
import type { HTMLAttributes } from 'vue'
import DrawerTrigger from './DrawerTrigger.vue'
import DrawerContent from './DrawerContent.vue'
import DrawerHeader from './DrawerHeader.vue'
import DrawerFooter from './DrawerFooter.vue'
import DrawerTitle from './DrawerTitle.vue'
import DrawerDescription from './DrawerDescription.vue'
import omit from 'lodash/omit'
import { type DrawerVariants } from '@/components/ui/drawer'

const props = withDefaults(defineProps<DialogRootProps & {
  class?: HTMLAttributes['class']
  title?: string
  side?: DrawerVariants['side']
  description?: string
}>(), {
  side: 'right'
})
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
