<template>
  <div :class="cn('relative w-full items-center', props.class)">
    <InputBase
      v-bind="$attrs"
      v-model="modelValue"
      v-autofocus="autofocus"
      :class="[
        ((icon && iconPosition === 'left') || $slots.leading) && 'ps-8',
        ((icon && iconPosition === 'right') || $slots.trailing) && 'pe-8'
      ]"
    />
    <span v-if="$slots.leading || (icon && iconPosition === 'left')" class="absolute start-0 inset-y-0 flex items-center justify-center px-2 pointer-events-none">
      <slot name="leading">
        <Icon :icon="icon!" class="size-4 text-muted-foreground" />
      </slot>
    </span>
    <span v-if="$slots.trailing || (icon && iconPosition === 'right')" class="absolute end-0 inset-y-0 flex items-center justify-center px-2 pointer-events-none">
      <slot name="trailing">
        <Icon :icon="icon!" class="size-4 text-muted-foreground" />
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'
import vAutofocus from '@/directives/autofocus'
import { Icon } from '@/components/ui/icon'
import InputBase from '@/components/ui/input/InputBase.vue'

defineOptions({
  inheritAttrs: false
})

const modelValue = defineModel<string | number | null>()
const props = withDefaults(defineProps<{
  autofocus?: boolean
  icon?: string
  iconPosition?: string
  class?: HTMLAttributes['class']
}>(), {
  iconPosition: 'left',
  autofocus: false
})
</script>
