import type { BaseAPIType } from '/@/api/base'
import type { WForm } from '/@/components/UI/Form'
import type { WTable } from '/@/components/UI/Table'

export declare namespace WCrud {
  type SetProps<T> = (p: Partial<Props<T>>) => void

  type Props<T = RowData> = {
    baseAPI?: BaseAPIType<T>
    onBeforeRequest?: (data: T) => T
    tableProps?: Omit<WTable.Props<T>, 'apiProps'>
    formProps?: Omit<WForm.Props<T>, 'advancedProps'> & {
      drawerWidth?: string | number
    }
  }

  namespace Inst {
    interface WCrudInst<T = RowData> {
      setProps: SetProps<T>
      onTableOpenCreateForm: () => void
      onApiTableReadAndOpenUpdateForm: (id: StringOrNumber) => Promise<void>
      onApiTableDelete: (is: StringOrNumber) => Promise<void>
      onApiTableDeleteMany: () => Promise<void>
      onGetFormData: () => Ref<T>
      onGetActionType: () => Ref<ActionType>
      onGetApiTableListParams: () => Ref<BaseListParams<T>>
    }
  }

  type useFormReturnType<T = RowData> = [
    (instance: Inst.WCrudInst<T>) => void,
    Omit<Inst.WCrudInst<T>, 'setProps'>
  ]
}
