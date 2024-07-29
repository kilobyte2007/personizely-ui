import { type VariantProps, cva } from 'class-variance-authority'

export { default as Drawer } from './Drawer.vue'

export const drawerVariants = cva('fixed z-50 flex flex-col gap-4 bg-background py-6 px-0 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500', {
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom:
            'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'inset-y-0 left-0 h-full w-1/3 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left max-w-full',
      right:
            'inset-y-0 right-0 h-full w-1/3 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right max-w-full'
    }
  },
  defaultVariants: {
    side: 'right'
  }
})

export type DrawerVariants = VariantProps<typeof drawerVariants>
