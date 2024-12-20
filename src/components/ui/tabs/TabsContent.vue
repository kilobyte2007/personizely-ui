<template>
  <TabsContent
    :class="cn('data-[orientation=horizontal]:mt-4 data-[orientation=vertical]:ml-4 rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </TabsContent>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsContent, type TabsContentProps } from 'reka-ui'
import { cn } from '@/utils/tailwind'

const props = defineProps<TabsContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

defineOptions({
  inheritAttrs: false
})
</script>
