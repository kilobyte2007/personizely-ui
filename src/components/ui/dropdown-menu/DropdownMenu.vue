<template>
  <DropdownMenuRoot v-bind="omit(forwarded, ['align', 'side', 'label', 'items', 'onSelect'])">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="min-w-56"
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
      <template v-for="(item, index) in items">
        <template v-if="'items' in item">
          <template v-if="item.label">
            <DropdownMenuLabel>
              <slot name="label" v-bind="{ item }">
                {{ item.label }}
              </slot>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </template>
          <DropdownMenuGroup>
            <DropdownMenuPart v-for="groupItem in item.items" :item="groupItem" @select="$emit('select', $event)" />
          </DropdownMenuGroup>
        </template>
        <DropdownMenuPart v-else :item="item" @select="$emit('select', $event)" />
        <DropdownMenuSeparator v-if="index !== items.length - 1" />
      </template>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, type DropdownMenuContentProps, useForwardPropsEmits } from 'radix-vue'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuGroup from './DropdownMenuGroup.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuPart from './DropdownMenuPart.vue'
import omit from 'lodash/omit'

interface MenuItem {
  label: string
  icon?: string
  help?: string
}

interface MenuItemWithChildren {
  label: string
  icon?: string
  children: MenuItem[]
}

interface GroupItem {
  items: (MenuItem | MenuItemWithChildren)[]
  label?: string
}

const props = defineProps<DropdownMenuRootProps & Pick<DropdownMenuContentProps, 'side' | 'align'> & {
  items:(MenuItem | MenuItemWithChildren | GroupItem)[]
  label?: string
}>()
const emits = defineEmits<DropdownMenuRootEmits & {
  select: [item: MenuItem | MenuItemWithChildren]
}>()

const forwarded = useForwardPropsEmits(props, emits)
</script>
