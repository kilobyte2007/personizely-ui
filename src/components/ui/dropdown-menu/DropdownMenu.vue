<template>
  <DropdownMenuRoot v-bind="omit(forwarded, ['align', 'side', 'label', 'items', 'onSelect'])">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuContent
      :class="cn('min-w-56', props.class)"
      :side-offset="4"
      :align-offset="4"
      :align="align"
      :side="side"
    >
      <template v-if="label || $slots.label">
        <DropdownMenuLabel>
          <slot name="label">
            {{ label }}
          </slot>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </template>

      <template v-for="(item, index) in items" :key="index">
        <DropdownMenuPart :item="item" @select="$emit('select', $event)" />
        <DropdownMenuSeparator v-if="index !== items.length - 1 && ('items' in item || 'items' in items[index + 1])" />
      </template>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, type DropdownMenuContentProps, useForwardPropsEmits } from 'radix-vue'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuPart from './DropdownMenuPart.vue'
import omit from 'lodash/omit'
import type { MenuItem, MenuItemWithChildren, MenuGroupItem } from './'
import { cn } from '@/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<DropdownMenuRootProps & Pick<DropdownMenuContentProps, 'side' | 'align'> & {
  items:(MenuItem | MenuItemWithChildren | MenuGroupItem)[]
  label?: string,
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<DropdownMenuRootEmits & {
  select: [item: MenuItem]
}>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
