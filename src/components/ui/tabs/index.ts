import { cva } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'

export const tabsVariants = cva('', {
  variants: {
    orientation: {
      vertical: 'flex',
      horizontal: ''
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})

export const tabsListVariants = cva('*:h-8', {
  variants: {
    orientation: {
      vertical: 'flex flex-col items-start *:w-full',
      horizontal: 'grid auto-cols-[1fr] grid-flow-col h-10 inline-grid items-center justify-center *:justify-center'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})
