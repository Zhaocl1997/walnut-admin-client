import type { TreeComponentProps as ElTreeProps } from 'element-plus/packages/tree/src/tree.type'

export * from './ref'
export * from './methods'

export interface WTreePropsOptions {
  id?: string
  children?: string
  label?: string
  disabled?: string
  isLeaf?: boolean
}

export interface WTreeProps extends Omit<Partial<ElTreeProps>, 'props'> {
  /**
   * @override
   */
  props?: WTreePropsOptions

  /**
   * @override
   * @type {Boolean}
   * @default true
   */
  highlightCurrent?: boolean

  /**
   * @override
   * @type {Boolean}
   * @default false
   */
  expandOnClickNode?: boolean

  /**
   * @description v-model
   */
  modelValue?: string[] | number[]

  /**
   * @description multiple, also means for original show-checkbox
   * @type {Boolean}
   * @default false
   */
  multiple?: boolean

  /**
   * @description used for multiple change, if only need leaf node, default false
   * @type {Boolean}
   * @default false
   */
  leafOnly?: boolean

  /**
   * @description used for multiple change, if include half checked node, default false
   * @type {Boolean}
   * @default false
   */
  includeHalfChecked?: boolean
}
