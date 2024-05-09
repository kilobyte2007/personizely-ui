import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-xs gap-1 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      xxs: 'px-2 h-5 rounded-sm font-normal text-xxs',
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
      size: 'xxs',
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

export const buttonIconVariants = cva('', {
  variants: {
    size: {
      xxs: 'w-3 h-3',
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

export type ButtonVariants = VariantProps<typeof buttonVariants>
