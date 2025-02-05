<template>
  <PopoverRoot v-bind="forwarded">
    <PopoverTrigger v-if="$slots.trigger">
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal :to="options.portalTo">
      <PopoverContent
        :align="align"
        :align-offset="alignOffset"
        :side="side"
        :side-offset="alignOffset"
        v-bind="$attrs"
        :class="
          cn(
            'z-50 min-w-48 max-h-[calc(var(--reka-popper-available-height)-4px)] overflow-auto rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            props.class,
          )
        "
      >
        <div class="text-sm">
          <slot />
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import {
  PopoverPortal,
  PopoverRoot,
  PopoverContent,
  type PopoverContentProps,
  useForwardPropsEmits
} from 'reka-ui'
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'
import { type HTMLAttributes } from 'vue'
import PopoverTrigger from './PopoverTrigger.vue'
import { useDelegatedProps } from '@/composables/delegated-props'
import { getOptions } from '@/options-provider'

const props = withDefaults(defineProps<PopoverRootProps & Pick<PopoverContentProps, 'side' | 'align' | 'alignOffset' | 'sideOffset'> & {
  class?: HTMLAttributes['class']
}>(), {
  align: 'center',
  alignOffset: 4,
  side: 'bottom',
  sideOffset: 4
})
const emits = defineEmits<PopoverRootEmits>()

const delegatedProps = useDelegatedProps(props, ['side', 'align', 'alignOffset', 'sideOffset', 'class'])
const forwarded = useForwardPropsEmits(delegatedProps, emits)
const options = getOptions()
</script>
