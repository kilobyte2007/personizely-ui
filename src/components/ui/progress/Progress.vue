<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
        props.class,
      )
    "
  >
    <slot />

    <ProgressIndicator :model-value="props.modelValue"/>
  </ProgressRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ProgressRoot,
  type ProgressRootProps
} from 'reka-ui'
import ProgressIndicator from './ProgressIndicator.vue'
import { cn } from '@/utils/tailwind'

const props = withDefaults(defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: 0
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>
