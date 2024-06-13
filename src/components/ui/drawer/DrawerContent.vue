<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/80 ata-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      @after-leave="$emit('hide')"
    />
    <DialogContent
      :class="cn(drawerVariants({ side }), props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits
} from 'radix-vue'
import { type DrawerVariants, drawerVariants } from '.'
import { cn } from '@/utils/tailwind'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: DrawerVariants['side']
}

defineOptions({
  inheritAttrs: false
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits & {
  hide: []
}>()

const delegatedProps = computed(() => {
  const { class: _, side: _side, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
