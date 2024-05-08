<template>
  <AccordionItem
    v-bind="omit(forwardedProps, ['title'])"
    :class="cn('[&:not(:last-child)]:border-b', props.class)"
  >
    <AccordionTrigger>
      <slot name="title">
        {{ title }}
      </slot>
    </AccordionTrigger>
    <AccordionContent>
      <slot />
    </AccordionContent>
  </AccordionItem>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'radix-vue'
import { cn } from '@/utils/tailwind'
import AccordionContent from './AccordionContent.vue'
import AccordionTrigger from './AccordionTrigger.vue'
import omit from 'lodash/omit'

const props = defineProps<AccordionItemProps & {
  class?: HTMLAttributes['class'],
  title?: string
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
