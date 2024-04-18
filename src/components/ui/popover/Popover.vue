<template>
  <PopoverRoot v-bind="omit(forwarded, ['side', 'align', 'class'])">
    <PopoverTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :align="align"
        :align-offset="4"
        :side="side"
        :side-offset="4"
        v-bind="$attrs"
        :class="
          cn(
            'z-50 min-w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
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
  type PopoverContentProps,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  useForwardPropsEmits
} from 'radix-vue'
import type { PopoverRootEmits, PopoverRootProps } from 'radix-vue'
import { cn } from '@/utils'
import type { HTMLAttributes } from 'vue'
import omit from 'lodash/omit'

const props = withDefaults(defineProps<PopoverRootProps & Pick<PopoverContentProps, 'side' | 'align'> & {
  class?: HTMLAttributes['class']
}>(), {
  align: 'center',
  side: 'bottom'
})
const emits = defineEmits<PopoverRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
