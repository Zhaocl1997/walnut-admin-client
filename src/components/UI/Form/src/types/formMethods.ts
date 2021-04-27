import type { WFormProps, WFormRule } from './formProps'

/**
 * @link https://element-plus.gitee.io/#/zh-CN/component/form#form-methods
 */
export interface ElFormMethods {
  validate: (valid?: boolean, result?: WFormRule) => Promise<boolean>
  validateField: (
    props?: string | string[],
    callback?: (errMessage?: string) => void
  ) => Promise<void>
  resetFields: () => Promise<void>
  clearValidate: (props?: string | string[]) => Promise<void>
}
/**
 * @description Extend from original el-form methods
 */
export interface WFormMethods extends ElFormMethods {
  [key: string]: any

  setProps: (props: Partial<WFormProps>) => void
}
