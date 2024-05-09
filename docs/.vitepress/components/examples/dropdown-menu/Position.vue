<template>
  <DropdownMenu
    :items="items"
    label="User"
    side="right"
    align="start"
  >
    <template #trigger>
      <Button>Show menu</Button>
    </template>
  </DropdownMenu>
</template>
<script setup lang="ts">
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

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
