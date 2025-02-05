type Options = { portalTo?: string | HTMLElement }

const options: Options = {
  portalTo: 'body'
}

const setOptions = (payload: Partial<Options>) => {
  Object.assign(options, payload)
}

const getOptions = () => {
  return options
}

export {
  type Options,
  setOptions,
  getOptions
}
