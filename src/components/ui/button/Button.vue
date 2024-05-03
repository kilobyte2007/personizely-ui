<template>
  <DefineTemplate>
    <Primitive
      v-bind="$attrs"
      :as="href ? 'a' : 'button'"
      :class="cn(buttonVariants({ variant, size, icon: Boolean(icon || $slots.icon) && !$slots.default }), props.class)"
      :disabled="!href ? disabled || loading : null"
      :href="href && !(disabled || loading) ? href : null"
    >
      <template v-if="iconPosition === 'left' && (icon || $slots.icon || loading)">
        <template v-if="loading">
          <ProgressCircular
            v-if="loading"
            class="h-4 w-4"
            :class="buttonIconVariants({ size })"
          />
        </template>
        <slot v-else name="icon">
          <Icon
            :icon="icon"
            :class="buttonIconVariants({ size })"
          />
        </slot>
      </template>

      <slot />

      <template v-if="iconPosition === 'right' && (icon || $slots.icon || loading)">
        <template v-if="loading">
          <ProgressCircular
            v-if="loading"
            class="h-4 w-4"
            :class="buttonIconVariants({ size })"
          />
        </template>
        <slot v-else name="icon">
          <Icon
            :icon="icon"
            :class="buttonIconVariants({ size })"
          />
        </slot>
      </template>
    </Primitive>
  </DefineTemplate>

  <Tooltip v-if="tooltip || $slots.tooltip">
    <template #trigger>
      <ReuseTemplate />
    </template>

    <slot name="tooltip">
      {{ tooltip }}
    </slot>
  </Tooltip>
  <ReuseTemplate v-else />
</template>

<script setup lang="ts">
import type { HTMLAttributes, AnchorHTMLAttributes } from 'vue'
import { Primitive } from 'radix-vue'
import { buttonIconVariants, type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/utils'
import ProgressCircular from '@/components/ui/progress-circular'
import Icon from '@/components/ui/icon'
import { createReusableTemplate } from '@vueuse/core'
import Tooltip from '@/components/ui/tooltip'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  tooltip?: string
  icon?: string
  iconPosition?: string
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  href?: AnchorHTMLAttributes['href']
  loading?: boolean
}>(), {
  loading: false,
  disabled: false,
  iconPosition: 'left'
})
</script>
