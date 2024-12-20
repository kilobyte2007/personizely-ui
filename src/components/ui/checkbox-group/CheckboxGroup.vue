<template>
  <CheckboxGroupRoot v-bind="forwarded" :class="checkboxGroupVariants({ orientation })">
    <Checkbox
      v-for="(option, index) in preparedOptions"
      :key="option[keys.id] || option[keys.value] || index"
      :value="option[keys.value]"
      :disabled="disabled || option[keys.disabled]"
      :help="option[keys.help]"
      @blur="$emit('blur', option, $event)"
      @focus="$emit('focus', option, $event)"
    >
      <slot v-bind="{ option }">
        {{ option[keys.label] || option }}
      </slot>
      <template v-if="$slots.help" #help>
        <slot v-bind="{ option }" name="help">
          {{ option[keys.help] }}
        </slot>
      </template>
    </Checkbox>
  </CheckboxGroupRoot>
</template>

<script setup lang="ts">
import { computed, type Events } from 'vue'
import { prepareOptions } from '@/utils/options'
import type { Keys, Option, CustomOption } from '@/utils/options'
import { checkboxGroupVariants } from './'
import {
  CheckboxGroupRoot,
  type CheckboxGroupRootProps,
  type CheckboxGroupRootEmits
} from 'reka-ui'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import { forwardPropsEmits } from '@/composables/forward-props-emits'
import { useDelegatedProps } from '@/composables/use-delegated-props'
import { useEmitAsProps } from '@/composables/emits-as-props'

const props = withDefaults(defineProps<Omit<CheckboxGroupRootProps, 'as' | 'asChild'> & {
  keys?: Keys
  options: string[] | Option[] | CustomOption[] | { [key:string]: string }
}>(), {
  loop: false,
  dir: 'ltr',
  orientation: 'vertical',
  keys: () => ({
    id: 'id',
    label: 'label',
    help: 'help',
    value: 'value',
    disabled: 'disabled'
  })
})

const emits = defineEmits<CheckboxGroupRootEmits & {
  focus: [option: Option | CustomOption, event: Events['onFocus']]
  blur: [option: Option | CustomOption, event: Events['onBlur']]
}>()

const delegatedProps = useDelegatedProps(props, ['keys', 'options'])
const delegatedEmits = useEmitAsProps(emits, ['focus', 'blur'])
const forwarded = forwardPropsEmits(delegatedProps, delegatedEmits)

const preparedOptions = computed(() => prepareOptions(props.options, props.keys))
</script>
