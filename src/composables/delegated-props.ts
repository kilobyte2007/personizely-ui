import { type MaybeRefOrGetter, computed } from 'vue'
import omit from 'lodash/omit'

export function useDelegatedProps<T extends Record<string, any>> (props: MaybeRefOrGetter<T>, exclude: Array<string> = []) {
  return computed(() => omit(props, exclude))
}
