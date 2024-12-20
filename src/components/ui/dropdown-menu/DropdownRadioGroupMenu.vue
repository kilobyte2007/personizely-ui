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
      <DropdownMenuRadioGroup v-model="modelValue">
        <DropdownMenuRadioGroupItem
          v-for="(item, index) in items"
          :key="index"
          :value="item.value"
          @select="$emit('select', item)"
        >
          <span>{{ item.label }}</span>
          <DropdownMenuHelp v-if="item.help">
            {{ item.help }}
          </DropdownMenuHelp>
        </DropdownMenuRadioGroupItem>
      </DropdownMenuRadioGroup>
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
import DropdownMenuRadioGroup from './DropdownMenuRadioGroup.vue'
import DropdownMenuRadioGroupItem from './DropdownMenuRadioItem.vue'
import DropdownMenuHelp from './DropdownMenuHelp.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import type { MenuRadioItem } from './'
import { cn } from '@/utils/tailwind'
import { type HTMLAttributes, provide } from 'vue'
import { useDelegatedProps } from '@/composables/use-delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { forwardPropsEmits } from '@/composables/forward-props-emits'

const modelValue = defineModel<any>()
const props = defineProps<DropdownMenuRootProps & Pick<DropdownMenuContentProps, 'side' | 'align'> & {
  items: MenuRadioItem[]
  label?: string,
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<DropdownMenuRootEmits & {
  select: [item: MenuRadioItem]
}>()

provide('hasDropdown', true)

const delegatedProps = useDelegatedProps(props, ['align', 'side', 'label', 'items', 'class', 'modelValue'])
const delegatedEmits = useEmitAsProps(emits, ['select', 'update:modelValue'])
const forwarded = forwardPropsEmits(delegatedProps, delegatedEmits)
</script>
