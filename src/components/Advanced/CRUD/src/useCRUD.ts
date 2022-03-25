import type { WCrud } from './types'

import { isInSetup } from '/@/utils/shared'

export const useCRUD = <T = RowData>(
  props: WCrud.Props<T>
): WCrud.useFormReturnType<T> => {
  isInSetup()

  const wCrudRef = ref<Nullable<WCrud.Inst.WCrudInst<T>>>(null)

  const register = (instance: WCrud.Inst.WCrudInst<T>) => {
    wCrudRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    onTableOpenCreateForm: () => wCrudRef.value?.onTableOpenCreateForm(),
    onApiTableReadAndOpenUpdateForm: async (id: StringOrNumber) =>
      await wCrudRef.value?.onApiTableReadAndOpenUpdateForm(id),
    onApiTableDelete: async (id: StringOrNumber) =>
      await wCrudRef.value?.onApiTableDelete(id),
    onApiTableDeleteMany: async () =>
      await wCrudRef.value?.onApiTableDeleteMany(),
    onGetFormData: () => wCrudRef.value?.onGetFormData()!,
    onGetActionType: () => wCrudRef.value?.onGetActionType()!,
    onGetApiTableListParams: () => wCrudRef.value?.onGetApiTableListParams()!,
  }

  return [register, methods]
}
