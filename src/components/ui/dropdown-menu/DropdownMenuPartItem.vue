<template>
  <DropdownMenuSub v-if="'children' in item">
    <DropdownMenuSubTrigger>
      <slot name="icon" v-bind="{ item }">
        <Icon v-if="item.icon" :icon="item.icon" class="mr-2 h-4 w-4" />
      </slot>
      <span>{{ item.label }}</span>
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <template v-for="(child, index) in item.children" :key="index">
          <DropdownMenuPart :item="child" @select="$emit('select', $event)" />
          <DropdownMenuSeparator v-if="index !== item.children.length - 1 && ('items' in child || 'items' in item.children[index + 1])" />
        </template>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
  <DropdownMenuItem v-else @select="$emit('select', item)">
    <slot name="icon" v-bind="{ item }">
      <Icon v-if="item.icon" :icon="item.icon" class="mr-2 h-4 w-4" />
    </slot>
    <span>{{ item.label }}</span>
    <DropdownMenuShortcut v-if="item.help">
      {{ item.help }}
    </DropdownMenuShortcut>
  </DropdownMenuItem>
</template>

<script setup lang="ts">
import DropdownMenuPart from './DropdownMenuPart.vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
import DropdownMenuShortcut from './DropdownMenuShortcut.vue'
import DropdownMenuSub from './DropdownMenuSub.vue'
import DropdownMenuSubContent from './DropdownMenuSubContent.vue'
import DropdownMenuSubTrigger from './DropdownMenuSubTrigger.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import { DropdownMenuPortal } from 'radix-vue'
import Icon from '@/components/ui/icon'
import type { MenuItem, MenuItemWithChildren } from './'

defineProps<{
  item: MenuItem | MenuItemWithChildren
}>()

defineEmits<{
  select: [item: MenuItem]
}>()
</script>
<script setup lang="ts">
</script>
