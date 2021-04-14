import type { WDialogMethods } from './dialogMethods'

export type useDialogRegisterFn = (instance: WDialogMethods) => void

export type useDialogReturnType = [
  useDialogRegisterFn,
  Omit<WDialogMethods, 'setProps'>
]
