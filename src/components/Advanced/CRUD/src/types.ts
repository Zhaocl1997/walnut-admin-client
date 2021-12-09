import type { BaseAPIType } from '/@/api/base'
import type { WForm } from '/@/components/UI/Form'
import type { WTable } from '/@/components/UI/Table'

export declare namespace WCrud {
  type SetProps = (p: Partial<Props>) => void

  type Props<T = RowData> = {
    baseAPI?: BaseAPIType<T>
    defaultFormData?: T
    onBeforeRequest?: (data: T) => T
    tableProps?: Omit<WTable.Props<T>, 'apiProps'>
    formProps?: Omit<WForm.Props<T>, 'advancedProps'>
  }

  namespace Inst {
    interface WCrudInst {
      setProps: SetProps
      onCreateAndOpen: () => void
      onReadAndOpen: (id: StringOrNumber) => Promise<void>
      onDelete: (is: StringOrNumber) => Promise<void>
      onDeleteMany: () => Promise<void>
    }
  }

  type useFormReturnType = [
    (instance: Inst.WCrudInst) => void,
    Omit<Inst.WCrudInst, 'setProps'>
  ]
}
