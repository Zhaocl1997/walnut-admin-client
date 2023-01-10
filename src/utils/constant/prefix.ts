const { name, version } = __APP_INFO__

// storage prefix
export const storagePrefix = `__${name.toLocaleUpperCase().slice(0, 1)}__${version}__${mode()
  .slice(0, 3)
  .toLocaleUpperCase()}`
