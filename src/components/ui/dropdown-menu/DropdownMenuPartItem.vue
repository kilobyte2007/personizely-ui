<template>
  <DropdownMenuSub v-if="'children' in item">
    <DropdownMenuSubTrigger>
      <slot name="icon" v-bind="{ item }">
        <Icon v-if="item.icon" :icon="item.icon" class="h-4 w-4" />
      </slot>
      <span>
        <slot name="label" v-bind="{ item }">{{ item.label }}</slot>
      </span>
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <template v-for="(child, index) in item.children" :key="index">
          <DropdownMenuPart :item="child" @select="$emit('select', $event)">
            <template v-if="$slots.icon" #item-icon="{ item }">
              <slot name="icon" v-bind="{ item }" />
            </template>
            <template v-if="$slots.label" #item-label="{ item }">
              <slot name="label" v-bind="{ item }" />
            </template>
            <template v-if="$slots.help" #item-help="{ item }">
              <slot name="help" v-bind="{ item }" />
            </template>
          </DropdownMenuPart>
          <DropdownMenuSeparator v-if="index !== item.children.length - 1 && ('items' in child || 'items' in item.children[index + 1])" />
        </template>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
  <DropdownMenuItem v-else :disabled="item.disabled" @select="$emit('select', item)">
    <slot name="icon" v-bind="{ item }">
      <Icon v-if="item.icon" :icon="item.icon" class="h-4 w-4" />
    </slot>
    <span>
      <slot name="label" v-bind="{ item }">{{ item.label }}</slot>
    </span>
    <slot name="help" v-bind="{ item }">
      <DropdownMenuShortcut v-if="item.shortcut">
        {{ item.help }}
      </DropdownMenuShortcut>
      <DropdownMenuHelp v-else-if="item.help">
        {{ item.help }}
      </DropdownMenuHelp>
    </slot>
  </DropdownMenuItem>
</template>

<script setup lang="ts">
import DropdownMenuPart from './DropdownMenuPart.vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
import DropdownMenuShortcut from './DropdownMenuShortcut.vue'
import DropdownMenuHelp from './DropdownMenuHelp.vue'
import DropdownMenuSub from './DropdownMenuSub.vue'
import DropdownMenuSubContent from './DropdownMenuSubContent.vue'
import DropdownMenuSubTrigger from './DropdownMenuSubTrigger.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import { DropdownMenuPortal } from 'radix-vue'
import { Icon } from '@/components/ui/icon'
import type { MenuItem, MenuItemWithChildren } from './'

defineProps<{
  item: MenuItem | MenuItemWithChildren
}>()

defineEmits<{
  select: [item: MenuItem]
}>()
</script>
