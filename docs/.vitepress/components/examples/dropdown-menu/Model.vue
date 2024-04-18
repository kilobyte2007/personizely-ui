<template>
  <div class="flex flex-col gap-5 items-center">
    <Button @click="open = true">
      Show menu
    </Button>

    <DropdownMenu
      v-model:open="open"
      :items="items"
      label="User"
    >
      <template #trigger>
        <Button icon="menu" />
      </template>
    </DropdownMenu>
  </div>
</template>
<script setup lang="ts">
import DropdownMenu from '@/components/ui/dropdown-menu'
import Button from '@/components/ui/button'
import { ref } from 'vue'

const open = ref(false)
const items = [
  {
    label: 'This is a simple menu item',
    icon: 'save'
  },
  {
    label: 'Account',
    items: [
      {
        label: 'Edit settings',
        icon: 'cog',
        help: '⇧⌘P'
      },
      {
        label: 'Team',
        icon: 'user'
      },
      {
        label: 'Invite',
        icon: 'share',
        children: [
          {
            label: 'Email',
            icon: 'mail',
            help: '⇧⌘E'
          },
          {
            label: 'Messenger',
            icon: 'send',
            help: '⇧⌘M'
          }
        ]
      }
    ]
  },
  {
    label: 'Logout',
    icon: 'log-out'
  }
]
</script>
