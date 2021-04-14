import type { WFormRule } from './formProps'

export interface ElFormMethods {
  validate: (valid?: boolean, result?: WFormRule) => Promise<boolean>
  validateField: (
    props?: string | string[],
    callback?: (errMessage?: string) => void
  ) => Promise<void>
  resetFields: () => Promise<void>
  clearValidate: (props?: string | string[]) => Promise<void>
}

export interface WFormMethods extends ElFormMethods {
  [key: string]: any
}
