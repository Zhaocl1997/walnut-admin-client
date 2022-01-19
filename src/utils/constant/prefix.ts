import pkg from '/package.json'
import { mode } from './vue'

// app relative
export const appName = pkg.name.toLocaleUpperCase()
export const appVersion = pkg.version

// storage prefix
export const storagePrefix = `__${appName.slice(0, 1)}__${appVersion}__${mode()
  .slice(0, 3)
  .toLocaleUpperCase()}`
