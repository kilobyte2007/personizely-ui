<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="cn(toggleVariants({
      variant: variant,
      size: size,
      icon: Boolean(icon)
    }), props.class)"
  >
    <slot>
      <Icon
        :class="buttonIconVariants({ size })"
        :icon="icon!"
      />
    </slot>
  </ToggleGroupItem>
</template>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, computed } from 'vue'
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'radix-vue'
import { toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/utils/tailwind'
import { buttonIconVariants } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
  icon?: string
}>()

const delegatedProps = computed(() => {
  const { class: _, variant: _variant, size: _size, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
