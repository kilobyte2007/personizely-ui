<template>
  <Tooltip :disabled="!icon || !label">
    <template #trigger>
      <div>
        <Toggle
          v-bind="forwarded"
          :aria-label="label"
          :class="cn(toggleVariants({ variant, size, icon: Boolean(icon) }), props.class)"
        >
          <slot>
            <Icon
              v-if="icon"
              :class="buttonIconVariants({ size })"
              :icon="icon"
            />
          </slot>
        </Toggle>
      </div>
    </template>

    {{ label }}
  </Tooltip>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'radix-vue'
import { type ToggleVariants, toggleVariants } from '.'
import { cn } from '@/utils/tailwind'
import { Icon } from '@/components/ui/icon'
import { Tooltip } from '@/components/ui/tooltip'
import { buttonIconVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<ToggleProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
  icon?: string
  label?: string
}>(), {
  variant: 'default',
  size: 'md',
  disabled: false
})

const emits = defineEmits<ToggleEmits>()

const delegatedProps = computed(() => {
  const { class: _, size: _size, variant: _variant, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
