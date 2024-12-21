<template>
  <RadioGroupRoot
    v-bind="forwarded"
    :class="cn(radioGroupVariants({ orientation }), props.class)"
  >
    <div v-for="(option, index) in preparedOptions" :key="option[keys.id] || index" class="flex items-start space-x-2">
      <RadioGroupItem
        :id="`${name}-${option[keys.id] || option[keys.value]}`"
        :value="option[keys.value]"
        :disabled="option[keys.disabled] || disabled"
        class="peer"
        @focus="$emit('focus', option)"
        @blur="$emit('blur', option)"
      />

      <div v-if="option[keys.help] || $slots.help" class="grid gap-1 leading-[1.2] [&>label]:peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        <Label :for="`${name}-${option[keys.id] || option[keys.value]}`">
          <slot v-bind="option">
            {{ option[keys.label] || option }}
          </slot>
        </Label>
        <p class="text-sm text-muted-foreground">
          <slot name="help" v-bind="{ option }">
            {{ option[keys.help] }}
          </slot>
        </p>
      </div>

      <Label v-else :for="`${name}-${option[keys.id] || option[keys.value]}`">
        <slot v-bind="option">
          {{ option[keys.label] || option }}
        </slot>
      </Label>
    </div>
  </RadioGroupRoot>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  RadioGroupRoot,
  type RadioGroupRootEmits,
  type RadioGroupRootProps,
  useId
} from 'reka-ui'
import { cn } from '@/utils/tailwind'
import { radioGroupVariants } from './'
import RadioGroupItem from './RadioGroupItem.vue'
import { Label } from '@/components/ui/label'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import { useDelegatedProps } from '@/composables/delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'
import { useForwardPropsEmits } from '@/composables/forward-props-emits'

const props = withDefaults(defineProps<RadioGroupRootProps & {
  class?: HTMLAttributes['class']
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string },
}>(), {
  keys: () => ({
    id: 'id',
    label: 'label',
    help: 'help',
    value: 'value',
    disabled: 'disabled'
  }),
  orientation: 'vertical',
  name: () => useId()
})

const emits = defineEmits<RadioGroupRootEmits & {
  blur: [option: Option | CustomOption]
  focus: [option: Option | CustomOption]
}>()

const delegatedProps = useDelegatedProps(props, ['keys', 'options', 'class'])
const delegatedEmits = useEmitAsProps(emits, ['blur', 'focus'])
const forwarded = useForwardPropsEmits(delegatedProps, delegatedEmits)

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
