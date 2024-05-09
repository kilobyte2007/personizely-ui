import { cva } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'

export const tabsVariants = cva('', {
  variants: {
    orientation: {
      vertical: 'flex',
      horizontal: 'grid'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})

export const tabsListVariants = cva('[&>*]:h-8', {
  variants: {
    orientation: {
      vertical: 'flex flex-col items-start [&>*]:w-full',
      horizontal: 'grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] h-10 grid w-full items-center justify-center [&>*]:justify-center'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
})
