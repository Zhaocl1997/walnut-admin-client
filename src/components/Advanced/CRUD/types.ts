import type { BaseAPIType } from '@/api/base'
import type { WForm } from '@/components/UI/Form'
import type { WTable } from '@/components/UI/Table'

export declare namespace WCrud {
  type SetProps<T> = (p: Partial<Props<T>>) => void

  /**
   * @description Props
   */
  interface Props<T> {
    baseAPI?: BaseAPIType<T>
    onBeforeRequest?: (data: T) => T
    tableProps?: Omit<WTable.Props<T>, 'apiProps'>
    formProps?: Partial<WForm.Props<T>>
  }

  /**
   * @description Emits
   */
  interface Emits<T> {
    hook: [inst: Inst.WCrudInst<T>]
  }

  /**
   * @description Inst
   */
  namespace Inst {
    interface WCrudInst<T> {
      setProps: SetProps<T>
      onOpenCreateForm: (defaultFormData?: Partial<T>) => void
      onReadAndOpenUpdateForm: (id: StringOrNumber) => Promise<void>
      onDeleteConfirm: (id: StringOrNumber) => Promise<T>
      onDeleteManyConfirm: () => Promise<T[]>
      onGetFormData: () => Ref<T>

      // onApiTableDeleteMany: () => Promise<void>
      // onGetApiTableListParams: () => Ref<WalnutBaseListParams<T>>
      // onGetActionType: () => Ref<IActionType>
      // onApiTableList: () => Promise<void>
      // onApiTableCloseForm: Fn
    }
  }

  type useCrudReturnType<T> = [
    (instance: Inst.WCrudInst<T>) => void,
    Omit<Inst.WCrudInst<T>, 'setProps'>,
  ]

  /**
   * @description Hooks
   */
  namespace Hooks {
    namespace UseCRUD {
      type Props<T> = WCrud.Props<T> | ComputedRef<WCrud.Props<T>> | IDeepMaybeRef<WCrud.Props<T>>

      type Methods<T> = Omit<Inst.WCrudInst<T>, 'setProps'>

      type ReturnType<T> = [
        (instance: Inst.WCrudInst<T>) => void,
        Methods<T>,
      ]
    }
  }
}
