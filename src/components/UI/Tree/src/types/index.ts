import type { TreeKey, TreeNode } from './ref'

export * from './ref'
export * from './methods'
export * from './props'

type ElTreePropsFn<D, T> = (data: TreeDataItem<D>[], node: TreeNode) => T

export interface WTreePropsOptions<D = Recordable> {
  id?: TreeKey
  children?: string
  label?: string | ElTreePropsFn<D, string>
  disabled?: boolean | ElTreePropsFn<D, boolean>
  isLeaf?: boolean | ElTreePropsFn<D, boolean>
}
