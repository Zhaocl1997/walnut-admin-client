import type { DropdownProps } from 'naive-ui'
import type { InternalTreeInst } from 'naive-ui/lib/tree/src/interface'

import type { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export declare namespace WDropdown {
  /**
   * @description Set props
   */
  type SetProps = (p: Partial<Props>) => void

  /**
   * @description Inst
   */
  namespace Inst {
    type NDropdownInst = InternalTreeInst

    interface EmitInst {
      setProps: SetProps

      openDropdown: (e: MouseEvent) => void

      closeDropdown: () => void
    }

    interface WDropdownInst extends Partial<NDropdownInst>, EmitInst {}
  }

  /**
   * @description Hook
   */
  namespace Hook {
    type useDropdown = [
      (instance: Inst.WDropdownInst) => void,
      Inst.WDropdownInst,
    ]
  }

  /**
   * @description Props
   */
  interface Props extends ExtendProps {
    dropdownProps: DropdownProps
  }

  /**
   * @description Emit
   */
  namespace Emit {
    type Hook = Inst.EmitInst

    interface Entry {
      (event: 'hook', params: Hook): void
    }
  }
}
