<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    :class="cn('flex items-center justify-center gap-1', props.class)"
  >
    <ToggleGroupItem
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :icon="item.icon"
      :size="size"
      :variant="variant"
      :value="item.value"
    >
      <slot v-if="$slots.default || !item.icon" v-bind="{ item }">
        {{ item.label }}
      </slot>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'vue'
import {
  ToggleGroupRoot,
  type ToggleGroupRootEmits,
  type ToggleGroupRootProps,
  useForwardPropsEmits
} from 'reka-ui'
import type { toggleVariants } from '@/components/ui/toggle'
import ToggleGroupItem from './ToggleGroupItem.vue'
import { cn } from '@/utils/tailwind'
import { useDelegatedProps } from '@/composables/use-delegated-props'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

interface Item {
  label: string
  value: number | string
  icon?: string
}

const emits = defineEmits<ToggleGroupRootEmits>()
const props = defineProps<ToggleGroupRootProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size'],
  items: Item[]
}>()

defineSlots<{
  default(props: { item: Item }): any
}>()

const delegatedProps = useDelegatedProps(props, ['class', 'size', 'variant', 'items'])
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
