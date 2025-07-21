<template>
  <PaginationRoot
    data-slot="pagination"
    v-bind="forwarded"
    :class="cn('mx-auto flex w-full justify-center', props.class)"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationFirst />
      <PaginationPrevious />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
        >
          {{ item.value }}
        </PaginationItem>

        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </PaginationRoot>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationRoot, type PaginationRootEmits, type PaginationRootProps, useForwardPropsEmits } from 'reka-ui'
import PaginationContent from './PaginationContent.vue'
import PaginationItem from './PaginationItem.vue'
import PaginationFirst from './PaginationFirst.vue'
import PaginationPrevious from './PaginationPrevious.vue'
import PaginationNext from './PaginationNext.vue'
import PaginationLast from './PaginationLast.vue'
import PaginationEllipsis from './PaginationEllipsis.vue'
import { cn } from '@/utils/tailwind'

const props = defineProps<PaginationRootProps & {
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
