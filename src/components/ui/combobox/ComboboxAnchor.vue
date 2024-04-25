<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { ComboboxAnchor, ComboboxTrigger, ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <button v-bind="forwardedProps" class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white hover:bg-mauve3 focus:ring-ring focus:shadow-black outline-none">
    Placeholder...
    <ChevronDown class="h-4 w-4" />
  </button>
</template>
