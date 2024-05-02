<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    v-model="normalizedValue"
    :class="cn('flex items-center justify-center gap-1', props.class)"
  >
    <ToggleGroupItem
      v-for="item in items"
      :key="item.value"
      :aria-label="item.label"
      :icon="item.icon"
      :size="size"
      :variant="variant"
      :value="item.value"
    >
      <slot v-if="$slots.default || !item.icon" v-bind="{ item }">
        {{ item.label }}
      </slot>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, computed } from 'vue'
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'radix-vue'
import type { toggleVariants } from '@/components/ui/toggle'
import ToggleGroupItem from './ToggleGroupItem.vue'
import { cn } from '@/utils'
import { useNormalizedTypes } from '@/composables/useNormalizedTypes'
import { useEmpty } from '@/composables/useEmpty'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

interface Item {
  label: string
  value: number | string
  icon?: string
}

const modelValue = defineModel<string | number | null | true | false | string[] | number[]>()
const normalizedValue = useNormalizedTypes(useEmpty(modelValue, null, undefined))
const props = defineProps<Omit<ToggleGroupRootProps, 'modelValue'> & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size'],
  items: Item[]
}>()
const emits = defineEmits<Omit<ToggleGroupRootEmits, 'update:modelValue'>>()

const delegatedProps = computed(() => {
  const { class: _, items, ...delegated } = props
  return delegated
})

defineSlots<{
  default(props: { item: Item }): any
}>()

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
