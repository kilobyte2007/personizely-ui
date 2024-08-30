<template>
  <TabsRoot v-bind="forwarded" :class="cn(tabsVariants({ orientation }), props.class)">
    <TabsList :class="cn(tabsListVariants({ orientation }), 'rounded-md bg-muted p-1 text-muted-foreground')">
      <template v-for="tab in getTabs($slots.default ? $slots.default() : [])">
        <Tooltip v-if="tab.props?.tooltip" :key="'tooltip-' + tab.props?.value">
          <template #trigger>
            <TabsTrigger :value="tab.props?.value" :disabled="tab.props?.disabled">
              <template v-if="tab.props?.title">
                {{ tab.props?.title }}
              </template>
              <Icon v-else-if="tab.props?.icon" :icon="tab.props.icon" />
            </TabsTrigger>
          </template>
          {{ tab.props?.tooltip }}
        </Tooltip>
        <TabsTrigger
          v-else
          :key="tab.props?.value"
          :value="tab.props?.value"
          :disabled="tab.props?.disabled"
        >
          <template v-if="tab.props?.title">
            {{ tab.props?.title }}
          </template>
          <Icon v-else-if="tab.props?.icon" :icon="tab.props.icon" />
        </TabsTrigger>
      </template>
    </TabsList>
    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
import { TabsRoot, useForwardPropsEmits, TabsList } from 'radix-vue'
import type { TabsRootEmits, TabsRootProps } from 'radix-vue'
import TabsTrigger from './TabsTrigger.vue'
import { Icon } from '@/components/ui/icon'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/utils/tailwind'
import { tabsVariants, tabsListVariants } from '@/components/ui/tabs/index'
import type { HTMLAttributes, VNode } from 'vue'
const props = defineProps<TabsRootProps & {
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<TabsRootEmits>()

const isFragment = (vNode: VNode) => vNode.type === Symbol.for('v-fgt')

const getTabs = (nodes: VNode[]) => {
  const tabs = [] as VNode[]
  nodes.forEach((node) => {
    if (isFragment(node) && node.children) {
      tabs.push(...getTabs(node.children as VNode[]))
    } else {
      tabs.push(node)
    }
  })

  return tabs
}

const forwarded = useForwardPropsEmits(props, emits)
</script>
