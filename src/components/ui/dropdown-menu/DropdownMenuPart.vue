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
        <DropdownMenuPart v-for="child in item.children" :item="child" @select="$emit('select', $event)" />
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
import DropdownMenuItem from './DropdownMenuItem.vue'
import DropdownMenuShortcut from './DropdownMenuShortcut.vue'
import DropdownMenuSub from './DropdownMenuSub.vue'
import DropdownMenuSubContent from './DropdownMenuSubContent.vue'
import DropdownMenuSubTrigger from './DropdownMenuSubTrigger.vue'
import { DropdownMenuPortal } from 'radix-vue'
import Icon from '@/components/ui/icon'

defineOptions({
  name: 'DropdownMenuPart'
})

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

defineProps<{
  item: MenuItem | MenuItemWithChildren
}>()

defineEmits<{
  select: [item: MenuItem | MenuItemWithChildren]
}>()
</script>
