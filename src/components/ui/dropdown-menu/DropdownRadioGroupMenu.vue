<template>
  <DropdownMenuRoot v-bind="omit(forwarded, ['align', 'side', 'label', 'items', 'onSelect', 'modelValue', 'onUpdateModelValue'])">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="min-w-56"
      :side-offset="4"
      :align-offset="4"
      :align="align"
      :side="side"
      :class="cn('min-w-56', props.class)"
    >
      <template v-if="label || $slots.label">
        <DropdownMenuLabel>
          <slot name="label">
            {{ label }}
          </slot>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </template>
      <DropdownMenuRadioGroup v-model="modelValue">
        <DropdownMenuRadioGroupItem
          v-for="(item, index) in items"
          :key="index"
          :value="item.value"
          @select="$emit('select', item)"
        >
          <span>{{ item.label }}</span>
          <DropdownMenuShortcut v-if="item.help">
            {{ item.help }}
          </DropdownMenuShortcut>
        </DropdownMenuRadioGroupItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import omit from 'lodash/omit'
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, type DropdownMenuContentProps, useForwardPropsEmits } from 'radix-vue'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuRadioGroup from './DropdownMenuRadioGroup.vue'
import DropdownMenuRadioGroupItem from './DropdownMenuRadioItem.vue'
import DropdownMenuShortcut from './DropdownMenuShortcut.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import type { MenuRadioItem } from './'
import { cn } from '@/utils/tailwind'
import type { HTMLAttributes } from 'vue'

const modelValue = defineModel<any>()
const props = defineProps<DropdownMenuRootProps & Pick<DropdownMenuContentProps, 'side' | 'align'> & {
  items: MenuRadioItem[]
  label?: string,
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<DropdownMenuRootEmits & {
  select: [item: MenuRadioItem]
}>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
