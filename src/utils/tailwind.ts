import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-xxs']
    }
  }
})

export function cn (...inputs: unknown[]) {
  return twMerge(clsx(inputs))
}
