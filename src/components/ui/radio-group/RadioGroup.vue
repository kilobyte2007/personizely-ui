<template>
  <RadioGroupRoot
    v-bind="omit(forwarded, ['options', 'keys'])"
    v-model="normalizedValue"
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

      <div v-if="option[keys.help] || $slots.help" class="grid gap-1 leading-[1.2] peer-disabled:[&>label]:cursor-not-allowed peer-disabled:opacity-70">
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
  useForwardPropsEmits,
  useId
} from 'radix-vue'
import { cn } from '@/utils'
import { radioGroupVariants } from './'
import RadioGroupItem from './RadioGroupItem.vue'
import { Label } from '@/components/ui/label'
import { type CustomOption, type Keys, type Option, prepareOptions } from '@/utils/options'
import omit from 'lodash/omit'
import { useNormalizedTypes } from '@/composables/useNormalizedTypes'
import { useEmpty } from '@/composables/useEmpty'

const modelValue = defineModel<string | number | null | true | false>()
const normalizedValue = useNormalizedTypes(useEmpty(modelValue))
const props = withDefaults(defineProps<Omit<RadioGroupRootProps, 'modelValue'> & {
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

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
