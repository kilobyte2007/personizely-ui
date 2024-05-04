<template>
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
      <DropdownMenuPartItem
        v-for="(groupItem, index) in item.items"
        :key="index"
        :item="groupItem"
        @select="$emit('select', $event)"
      />
    </DropdownMenuGroup>
  </template>
  <DropdownMenuPartItem v-else :item="item" @select="$emit('select', $event)" />
</template>

<script setup lang="ts">
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuGroup from './DropdownMenuGroup.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuPartItem from './DropdownMenuPartItem.vue'
import type { MenuItem, MenuItemWithChildren, MenuGroupItem } from './'

defineProps<{
  item: MenuItem | MenuItemWithChildren | MenuGroupItem
}>()

defineEmits<{
  select: [item: MenuItem]
}>()
</script>
