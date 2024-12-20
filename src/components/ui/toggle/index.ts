import { type VariantProps, cva } from 'class-variance-authority'

export { default as Toggle } from './Toggle.vue'

export const toggleVariants = cva('inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground', {
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
    },
    size: {
      '2xs': 'px-2 h-5 rounded-sm font-normal text-2xs',
      xs: 'px-3 h-6 rounded-sm font-normal',
      sm: 'px-3 h-7 rounded-sm font-normal',
      md: 'px-3 h-8',
      lg: 'px-4 h-9 text-sm gap-2'
    },
    icon: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      icon: true,
      size: '2xs',
      class: 'px-0 w-5'
    },
    {
      icon: true,
      size: 'xs',
      class: 'px-0 w-6'
    },
    {
      icon: true,
      size: 'sm',
      class: 'px-0 w-7'
    },
    {
      icon: true,
      size: 'md',
      class: 'px-0 w-8'
    },
    {
      icon: true,
      size: 'lg',
      class: 'px-0 w-9'
    }
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

export const toggleIconVariants = cva('', {
  variants: {
    size: {
      '2xs': 'w-3 h-3',
      xs: 'w-3 h-3',
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export type ToggleVariants = VariantProps<typeof toggleVariants>
