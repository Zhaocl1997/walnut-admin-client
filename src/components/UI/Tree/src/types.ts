import type { TreeProps } from 'naive-ui'
import type { InternalTreeInst } from 'naive-ui/lib/tree/src/interface'

export declare namespace WTree {
  /**
   * @description Set props
   */
  type SetProps<T> = (p: Partial<Props<T>>) => void

  /**
   * @description Inst
   */
  namespace Inst {
    type NTreeInst = InternalTreeInst

    interface EmitInst<T = RowData> {
      setProps: SetProps<T>
    }

    interface WTreeInst<T = RowData> extends Partial<NTreeInst>, EmitInst<T> {}
  }

  /**
   * @description Hook
   */
  namespace Hook {
    type useTree<T = RowData> = [
      (instance: Inst.WTreeInst<T>) => void,
      Inst.WTreeInst<T>,
    ]
  }

  /**
   * @description Props
   */
  interface Props<T = RowData> {
    /**
     * @description NTree original props
     */
    treeProps?: TreeProps

    /**
     * @description v-model:value
     */
    value?: StringOrNumber | StringOrNumber[]

    /**
     * @description refer to n-tree checkable
     */
    multiple?: boolean

    /**
     * @description custom tree toolbar
     */
    toolbar?: boolean

    /**
     * @description custom tree toolbar
     */
    deletable?: boolean

    /**
     * @description delete event
     */
    onTreeNodeItemDelete?: (deletedItem: T) => void

    /**
     * @description preset prefix icon, default will take `node.icon` as the icon field
     */
    presetPrefixIcon?: boolean

    /**
     * @description preset context menu, default include copy/paste
     */
    presetContextMenu?: boolean

    /**
     * @description paste event
     */
    onPaste?: (copyTarget: T, currentTarget: T) => void

    /**
     * @description max height, well just a height with scrollbar
     */
    maxHeight?: string

    /**
     * @description auth buttono
     */
    auths?: {
      delete?: string

      update?: string
    }
  }

  /**
   * @description Emit
   */
  namespace Emit {
    type Hook<T> = Inst.EmitInst<T>

    type SelectedKeys = StringOrNumber | StringOrNumber[] | undefined

    interface Entry<T = RowData> {
      (event: 'hook', params: Hook<T>): void
      (event: 'update:value', params: SelectedKeys): void
    }
  }
}
