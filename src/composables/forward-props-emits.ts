import { type MaybeRefOrGetter, computed, toRef } from 'vue'
import { useForwardProps } from 'reka-ui'

export function forwardPropsEmits<T extends Record<string, any>> (props: MaybeRefOrGetter<T>, emitProps: T) {
  const parsedProps = toRef(useForwardProps(props))

  return computed(() => ({
    ...parsedProps.value,
    ...emitProps
  }))
}
