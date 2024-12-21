<template>
  <TooltipRoot v-bind="forwarded">
    <TooltipTrigger as-child>
      <slot name="trigger" />
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        v-bind="$attrs"
        :side-offset="4"
        align="center"
        :class="cn('z-50 overflow-hidden rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', props.class)"
      >
        <slot />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<script setup lang="ts">
import {
  TooltipPortal,
  TooltipRoot,
  TooltipContent,
  TooltipTrigger,
  type TooltipRootEmits,
  type TooltipRootProps,
  useForwardPropsEmits
} from 'reka-ui'
import { cn } from '@/utils/tailwind'
import type { HTMLAttributes } from 'vue'
import { useDelegatedProps } from '@/composables/delegated-props'

const props = defineProps<TooltipRootProps & {
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<TooltipRootEmits>()

const delegatedProps = useDelegatedProps(props, ['class'])
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
