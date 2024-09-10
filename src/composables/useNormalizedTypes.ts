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

export function normalize (value: any | undefined): string {
  return value !== undefined && !isString(value) ? JSON.stringify(value) : value
}

export function denormalize (value: any | undefined): any {
  return value !== undefined && !isEncodedString(value) ? JSON.parse(value) : value
}

export function normalizeValue (value: any | undefined): string | string[] {
  return Array.isArray(value) ? value.map(normalize) : normalize(value)
}

export function denormalizeValue (value: any | undefined): any | any[] {
  return Array.isArray(value) ? value.map(denormalize) : denormalize(value)
}

export function useNormalizedTypes (modelValue: Ref) {
  return computed({
    get () {
      return normalizeValue(modelValue.value)
    },
    set (value) {
      modelValue.value = denormalizeValue(value)
    }
  })
}
