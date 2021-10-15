import pkg from '../../../package.json'
import { mode } from './vue'

// app relative
export const appName = pkg.name.toLocaleUpperCase()
export const appVersion = pkg.version

// storage prefix
export const storagePrefix = `__${appName.replace(
  '-',
  '__'
)}__${appVersion}__${mode().toLocaleUpperCase()}`
