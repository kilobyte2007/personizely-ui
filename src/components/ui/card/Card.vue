<template>
  <div
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm grid gap-4 p-8',
        props.class,
      )
    "
  >
    <CardHeader v-if="$slots.header || $slots.title || $slots.description || title || description">
      <slot name="header">
        <CardTitle v-if="title || $slots.title">
          <slot name="title">
            {{ title }}
          </slot>
        </CardTitle>
        <CardDescription v-if="description || $slots.description">
          <slot name="description">
            {{ description }}
          </slot>
        </CardDescription>
      </slot>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/tailwind'
import CardDescription from './CardDescription.vue'
import CardContent from './CardContent.vue'
import CardFooter from './CardFooter.vue'
import CardTitle from './CardTitle.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title?: string
  description?: string
}>()
</script>
