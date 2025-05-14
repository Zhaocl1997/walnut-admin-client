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

    /**
     * @default false
     * @description strict create/update form data based on schema item
     * some fields from read endpoint is useless in update endpoint, will cause params error
     * set true to pick fields that are declared in form schema, also concat with _id by default
     */
    strictFormData?: boolean
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
      onOpenCreateForm: (generateDefaultFormData?: boolean) => void
      onReadAndOpenUpdateForm: (id: StringOrNumber) => Promise<void>
      onDeleteConfirm: (id: StringOrNumber) => Promise<T>
      onDeleteManyConfirm: () => Promise<T[]>
      onGetFormData: () => Ref<T>
      onGetActionType: () => Ref<IActionType>
      onApiList: () => Promise<void>
      onGetApiListParams: () => Ref<WalnutBaseListParams<T>>

      // onApiTableDeleteMany: () => Promise<void>
      // onApiTableCloseForm: Fn
    }
  }

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
