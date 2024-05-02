import { computed, type Ref } from 'vue'

const isString = (value: any) => typeof value === 'string'
const isEncodedString = (value: string) => {
  try {
    JSON.parse(value)
    return false
  } catch {
    return true
  }
}

export function normalize (value: any | undefined) {
  return !Array.isArray(value) && value !== undefined && !isString(value) ? JSON.stringify(value) : value
}

export function denormalize (value: string | undefined) {
  return !Array.isArray(value) && value !== undefined && !isEncodedString(value) ? JSON.parse(value) : value
}

export function useNormalizedTypes (modelValue: Ref) {
  return computed({
    get () {
      return normalize(modelValue.value)
    },
    set (value) {
      modelValue.value = denormalize(value)
    }
  })
}
