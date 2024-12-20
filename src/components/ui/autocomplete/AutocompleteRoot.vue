<template>
  <ComboboxRoot
    v-bind="forwarded"
    :class="cn(props.class)"
    as-child
  >
    <slot />
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>(), {
  open: true,
  modelValue: ''
})

const emits = defineEmits<ComboboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
