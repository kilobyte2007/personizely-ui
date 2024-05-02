import { computed, type Ref } from 'vue'

export function useEmpty (modelValue: Ref, toNullValue: any = null, fromNullValue: any = '') {
  return computed({
    get () {
      return modelValue.value === toNullValue
        ? fromNullValue
        : modelValue.value
    },
    set (value) {
      modelValue.value = value === toNullValue
        ? fromNullValue
        : value
    }
  })
}
