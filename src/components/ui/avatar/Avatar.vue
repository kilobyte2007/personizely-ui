<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <AvatarImage v-if="src" :src="src" :alt="alt" />
    <AvatarFallback>
      <slot>
        {{ fallback }}
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AvatarRoot } from 'radix-vue'
import { type AvatarVariants, avatarVariant } from '.'
import AvatarImage from './AvatarImage.vue'
import AvatarFallback from './AvatarFallback.vue'
import { cn } from '@/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
  src?: string
  alt?: string
  fallback: string
}>(), {
  size: 'sm',
  shape: 'circle'
})
</script>
