<template>
  <div class="inline-flex">
    <Button
      v-bind="omit($props, ['accept', 'name'])"
      @click="input!.click()"
    >
      <template v-if="$slots.default" #default>
        <slot />
      </template>
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template v-if="$slots.tooltip" #tooltip>
        <slot name="tooltip" />
      </template>
    </Button>
    <input
      v-show="false"
      ref="input"
      type="file"
      :accept="accept"
      :name="name"
      :multiple="multiple"
      @change="$emit('change', $event)"
    >
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { type ButtonProps } from '@/components/ui/button/Button.vue'
import omit from 'lodash/omit'
import { ref } from 'vue'

const input = ref<HTMLElement | null>(null)

withDefaults(defineProps<{
  accept?: string
  name: string,
  multiple?: boolean
} & ButtonProps>(), {
  loading: false,
  disabled: false,
  iconPosition: 'left',
  multiple: false,
  icon: 'upload'
})
defineEmits<{
  change: [event: Event]
}>()
</script>
