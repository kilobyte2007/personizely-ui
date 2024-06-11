<template>
  <DefineTemplate>
    <component
      v-bind="buildAttrs($attrs)"
      :is="to ? 'router-link' : Primitive"
      :as="!to ? (href ? 'a' : 'button') : null"
      :class="cn(buttonVariants({ variant, size, icon: Boolean(icon || $slots.icon) && !$slots.default }), props.class)"
      :disabled="!href ? disabled || loading : null"
      :to="to || null"
    >
      <Icon
        v-if="iconPosition === 'right' && hasDropdown && $slots.default"
        icon="chevron-down"
        :class="buttonIconVariants({ size })"
      />

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
            :icon="icon!"
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
            :icon="icon!"
            :class="buttonIconVariants({ size })"
          />
        </slot>
      </template>

      <Icon
        v-if="iconPosition === 'left' && hasDropdown && $slots.default"
        icon="chevron-down"
        :class="buttonIconVariants({ size })"
      />
    </component>
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

<script lang="ts">
import type { ButtonVariants } from '@/components/ui/button'
import type { AnchorHTMLAttributes, HTMLAttributes } from 'vue'

type ButtonProps = {
  variant?: ButtonVariants['variant']
  tooltip?: string
  to?: any
  icon?: string
  iconPosition?: string
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  href?: AnchorHTMLAttributes['href']
  loading?: boolean
}

export { type ButtonProps }
</script>

<script setup lang="ts">
import { inject } from 'vue'
import { Primitive } from 'radix-vue'
import { buttonIconVariants, buttonVariants } from '.'
import { cn } from '@/utils/tailwind'
import { ProgressCircular } from '@/components/ui/progress-circular'
import { Icon } from '@/components/ui/icon'
import { Tooltip } from '@/components/ui/tooltip'
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

defineOptions({
  inheritAttrs: false
})

const hasDropdown = inject('hasDropdown', false)

const buildAttrs = (attrs: { [key: string]: any }) => {
  attrs = { ...attrs }
  if (!props.to) {
    attrs.href = props.href && !(props.disabled || props.loading) ? props.href : null
  }

  return attrs
}

const props = withDefaults(defineProps<ButtonProps>(), {
  loading: false,
  disabled: false,
  iconPosition: 'left'
})
</script>
