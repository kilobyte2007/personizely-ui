<template>
  <Tooltip :disabled="!label || !icon">
    <template #trigger>
      <ToggleGroupItem
        v-bind="forwardedProps"
        :aria-label="label"
        :class="cn(toggleVariants({
          variant: variant,
          size: size,
          icon: Boolean(icon)
        }), props.class)"
      >
        <slot>
          <component
            :is="typeof icon === 'string' ? Icon : icon"
            v-if="icon"
            :class="buttonIconVariants({ size })"
            :icon="icon!"
          />
        </slot>
      </ToggleGroupItem>
    </template>

    {{ label }}
  </Tooltip>
</template>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, type Component, computed } from 'vue'
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'reka-ui'
import { toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/utils/tailwind'
import { buttonIconVariants } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { Icon } from '@/components/ui/icon'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  label?: string
  size?: ToggleGroupVariants['size']
  icon?: string | Component
}>()

const delegatedProps = computed(() => {
  const { class: _, variant: _variant, size: _size, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
