<template>
  <Tooltip :disabled="!icon || !label">
    <template #trigger>
      <Toggle
        v-bind="forwarded"
        :aria-label="label"
        :data-active="modelValue"
        :class="cn(toggleVariants({ variant, size, icon: Boolean(icon) }), props.class)"
      >
        <slot>
          <component
            :is="typeof icon === 'string' ? Icon : icon"
            v-if="icon"
            :class="buttonIconVariants({ size })"
            :icon="icon!"
          />
        </slot>
      </Toggle>
    </template>

    {{ label }}
  </Tooltip>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed, type Component } from 'vue'
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'reka-ui'
import { type ToggleVariants, toggleVariants } from '.'
import { cn } from '@/utils/tailwind'
import { Icon } from '@/components/ui/icon'
import { Tooltip } from '@/components/ui/tooltip'
import { buttonIconVariants } from '@/components/ui/button'
import omit from 'lodash/omit'

const props = withDefaults(defineProps<ToggleProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
  icon?: string | Component
  label?: string
}>(), {
  variant: 'default',
  size: 'md',
  disabled: false
})

const emits = defineEmits<ToggleEmits>()

const delegatedProps = computed(() => {
  return omit(props, ['class', 'size', 'variant', 'icon', 'label'])
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
