<template>
  <DialogPortal>
    <DialogOverlay
      v-if="!disableOverlay"
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
} from 'reka-ui'
import { type DrawerVariants, drawerVariants } from '.'
import { cn } from '@/utils/tailwind'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: DrawerVariants['side']
  disableOverlay?: boolean
}

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<SheetContentProps>(), {
  disableOverlay: false
})

const emits = defineEmits<DialogContentEmits & {
  hide: []
}>()

const delegatedProps = computed(() => {
  const { class: _, side: _side, disableOverlay: _disableOverlay, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
