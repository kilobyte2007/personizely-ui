interface CustomOption {
  [key:string]: any
}

interface Option extends CustomOption {
  label: string
  value: string | number | boolean | Record<string, any>
  id?: any
  help?: string
  disabled?: boolean
}

interface Keys {
  id: string
  label: string
  help: string
  value: string
  disabled: string
}

export function prepareOptions (options: (Option | CustomOption | string)[] | { [p: string]: string }, keys: Keys): (CustomOption | Option)[] {
  if (Array.isArray(options)) {
    return options.map(option => typeof option !== 'object'
      ? { [keys.label]: option, [keys.value]: option }
      : option)
  }

  if (typeof options === 'object') {
    return Object.keys(options).map((value) => {
      return {
        label: options[value],
        value
      }
    })
  }

  return []
}

export type { Option, Keys, CustomOption }
