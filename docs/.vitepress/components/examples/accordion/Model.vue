<template>
  <Accordion
    v-model="value"
    type="single"
    class="w-full"
    collapsible
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
      :title="item.title"
    >
      {{ item.content }}
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { AccordionItem, Accordion } from '@/components/ui/accordion'
import { ref } from 'vue'

const value = ref('item-3')

const accordionItems = [
  { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
  { value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' }
]
</script>
