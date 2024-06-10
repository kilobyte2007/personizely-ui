<template>
  <DropdownMenuRoot v-bind="omit(forwarded, ['align', 'side', 'label', 'items', 'onSelect', 'modelValue', 'onUpdateModelValue'])">
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
      <DropdownMenuCheckboxItem
        v-for="(item, index) in items"
        :key="index"
        :value="item.value"
        :checked="modelValue.includes(item.value)"
        @update:checked="updateValue(item, $event)"
        @select="$emit('select', item)"
      >
        <span>{{ item.label }}</span>
        <DropdownMenuShortcut v-if="item.help">
          {{ item.help }}
        </DropdownMenuShortcut>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import omit from 'lodash/omit'
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, type DropdownMenuContentProps, useForwardPropsEmits } from 'radix-vue'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuShortcut from './DropdownMenuShortcut.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import type { MenuCheckboxItem } from './'
import DropdownMenuCheckboxItem from '@/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue'
import { cn } from '@/utils/tailwind'
import type { HTMLAttributes } from 'vue'

const modelValue = defineModel<any[]>({
  required: true
})

const props = defineProps<DropdownMenuRootProps & Pick<DropdownMenuContentProps, 'side' | 'align'> & {
  items: MenuCheckboxItem[]
  label?: string,
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<DropdownMenuRootEmits & {
  select: [item: MenuCheckboxItem]
}>()

const forwarded = useForwardPropsEmits(props, emits)

const updateValue = (item: MenuCheckboxItem, checked: boolean) => {
  const value = [...modelValue.value]
  if (checked) {
    value.push(item.value)
  } else {
    value.splice(value.indexOf(item.value), 1)
  }
  modelValue.value = value
}
</script>
