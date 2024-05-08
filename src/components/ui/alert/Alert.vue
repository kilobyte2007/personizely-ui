<template>
  <div v-if="visible" :class="cn(alertVariants({ type }), dismissible ? 'pr-12' : '', props.class)" role="alert">
    <slot name="icon">
      <Icon
        v-if="!removeIcon"
        :icon="icon"
        class="w-4 h-4 absolute left-3.5 top-3.5"
      />
    </slot>
    <h5 v-if="title || $slots.title" class="font-medium leading-tight tracking-tight" :class="!removeIcon ? 'pl-7' : ''">
      <slot name="title">
        {{ title }}
      </slot>
    </h5>
    <div :class="!removeIcon ? 'pl-7' : ''" class="text-sm leading-normal">
      <slot />
    </div>
    <Button
      v-if="dismissible"
      icon="x"
      variant="ghost"
      size="xxs"
      class="absolute right-2 top-2"
      @click="dismiss"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/ui/icon'
import Button from '@/components/ui/button'
import type { HTMLAttributes } from 'vue'
import { type AlertVariants, alertVariants } from '.'
import { cn } from '@/utils/tailwind'

const emit = defineEmits(['update:visible', 'dismiss'])

const props = withDefaults(defineProps<{
  type?: AlertVariants['type'],
  class?: HTMLAttributes['class'],
  removeIcon?: boolean,
  title?: string,
  dismissible?: boolean,
  visible?: boolean
}>(), {
  type: 'info',
  removeIcon: false,
  dismissible: true,
  visible: true
})

const icon = computed(() => {
  return {
    info: 'info',
    warning: 'triangle-alert',
    success: 'circle-check',
    error: 'circle-alert'
  }[props.type!]
})

const dismiss = () => {
  emit('update:visible', false)
  emit('dismiss')
}
</script>

