<template>
  <DropdownMenuRoot v-bind="forwarded">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuContent
      :class="cn('min-w-32', props.class)"
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
        :model-value="modelValue.includes(item.value)"
        @update:model-value="updateValue(item, $event)"
        @select="$emit('select', item)"
      >
        <span>{{ item.label }}</span>
        <DropdownMenuHelp v-if="item.help">
          {{ item.help }}
        </DropdownMenuHelp>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import {
  DropdownMenuRoot,
  type DropdownMenuRootEmits,
  type DropdownMenuRootProps,
  type DropdownMenuContentProps
} from 'reka-ui'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuHelp from './DropdownMenuHelp.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuCheckboxItem from './DropdownMenuCheckboxItem.vue'
import type { MenuCheckboxItem } from './'
import { type HTMLAttributes, provide } from 'vue'
import { cn } from '@/utils/tailwind'
import { useDelegatedProps } from '@/composables/use-delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { forwardPropsEmits } from '@/composables/forward-props-emits'

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

const delegatedProps = useDelegatedProps(props, ['align', 'side', 'label', 'items', 'class', 'modelValue'])
const delegatedEmits = useEmitAsProps(emits, ['select', 'update:modelValue'])
const forwarded = forwardPropsEmits(delegatedProps, delegatedEmits)

provide('hasDropdown', true)

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
