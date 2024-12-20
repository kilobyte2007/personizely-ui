<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', props.class)"
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <slot name="indicator">
        <Check class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { type CheckboxRootEmits, type CheckboxRootProps, useId } from 'reka-ui'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { Check } from 'lucide-vue-next'
import { cn } from '@/utils/tailwind'

const props = withDefaults(defineProps<CheckboxRootProps & {
  class?: HTMLAttributes['class']
}>(), {
  id: () => useId()
})
const emits = defineEmits<CheckboxRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
