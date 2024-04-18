<template>
  <DialogRoot v-bind="forwarded">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent :class="cn('grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]', $attrs.class)">
      <DialogHeader class="p-6 pb-0">
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
      <div class="text-sm py-2 px-6">
        <slot />
      </div>
      <DialogFooter v-if="$slots.footer" class="p-6 pt-0">
        <slot name="footer" />
      </DialogFooter>

      <DialogClose v-if="!removeCloseButton" as-child>
        <Button
          size="sm"
          icon="x"
          variant="ghost"
          class="absolute right-4 top-4"
        />
      </DialogClose>
    </DialogContent>
  </DialogRoot>
</template>

<script setup lang="ts">
import { DialogClose, DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'
import { cn } from '@/utils'
import Button from '@/components/ui/button'
import DialogTrigger from './DialogTrigger.vue'
import DialogHeader from './DialogHeader.vue'
import DialogTitle from './DialogTitle.vue'
import DialogDescription from './DialogDescription.vue'
import DialogContent from './DialogContent.vue'
import DialogFooter from './DialogFooter.vue'

const props = withDefaults(defineProps<DialogRootProps & {
  title?: string,
  description?: string,
  removeCloseButton?: boolean
}>(), {
  removeCloseButton: false
})
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
