<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue'
import { cn } from '@/utils'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="flex items-center border-b relative">
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2 pointer-events-none">
      <Search class="size-4 text-muted-foreground" />
    </span>
    <!--    <Primitive-->
    <!--      :ref="forwardRef"-->
    <!--      :as-child="asChild"-->
    <!--      :type="type"-->
    <!--      :disabled="disabled"-->
    <!--      :aria-expanded="rootContext.open.value"-->
    <!--      :aria-controls="rootContext.contentId"-->
    <!--      :aria-disabled="disabled ?? undefined"-->
    <!--      as="input"-->
    <!--      aria-autocomplete="list"-->
    <!--      role="searchbox"-->
    <!--      autocomplete="false"-->
    <!--      @input="handleInput"-->
    <!--      @keydown.down.up.prevent="handleKeyDown"-->
    <!--      @keydown.enter="rootContext.onInputEnter"-->
    <!--      @keydown.home.end.prevent="handleHomeEnd"-->
    <!--    >-->
    <!--      <slot />-->
    <!--    </Primitive>-->

    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      role="searchbox"
      :aria-expanded="null"
      size="10"
      :class="cn('flex h-8 w-full ps-8 pe-2 rounded-md bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', props.class)"
    />
  </div>
</template>



