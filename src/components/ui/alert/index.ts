import { type VariantProps, cva } from 'class-variance-authority'

export { default } from './Alert.vue'

export const alertVariants = cva('relative w-full rounded-lg border p-3', {
  variants: {
    type: {
      info: 'bg-background text-foreground',
      error:
          'border-error/50 text-error dark:border-destructive',
      warning:
          'border-warning/50 text-warning dark:border-warning',
      success:
          'border-success/50 text-success dark:border-success'
    }
  },
  defaultVariants: {
    type: 'info'
  }
})

export type AlertVariants = VariantProps<typeof alertVariants>
