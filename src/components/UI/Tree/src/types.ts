import type { TreeProps } from 'naive-ui'
import type { InternalTreeInst } from 'naive-ui/lib/tree/src/interface'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export declare namespace WTree {
  /**
   * @description Set props
   */
  type SetProps = (p: Partial<Props>) => void

  /**
   * @description Inst
   */
  namespace Inst {
    type NTreeInst = InternalTreeInst

    type EmitInst = {
      setProps: SetProps
    }

    interface WTreeInst extends Partial<NTreeInst>, EmitInst {}
  }

  /**
   * @description Hook
   */
  namespace Hook {
    type useTree = [(instance: Inst.WTreeInst) => void, Inst.WTreeInst]
  }

  /**
   * @description Props
   */
  interface Props extends ExtendProps {
    treeProps: TreeProps
  }

  /**
   * @description Emit
   */
  namespace Emit {
    type Hook = Inst.EmitInst

    type Entry = Inst.EmitInst
  }
}
