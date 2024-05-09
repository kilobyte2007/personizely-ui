import { cva } from 'class-variance-authority'

export { default as CheckboxGroup } from './CheckboxGroup.vue'

export const checkboxGroupVariants = cva('flex ', {
  variants: {
    direction: {
      vertical: 'flex-col gap-2',
      horizontal: 'gap-4'
    }
  },
  defaultVariants: {
    direction: 'vertical'
  }
})
