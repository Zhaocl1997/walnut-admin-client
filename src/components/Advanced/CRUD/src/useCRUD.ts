import type { WCrud } from './types'

import { isInSetup } from '/@/utils/shared'

export const useCRUD = <T = RowData>(
  props: WCrud.Props<T>
): WCrud.useFormReturnType => {
  isInSetup()

  const wCrudRef = ref<Nullable<WCrud.Inst.WCrudInst>>(null)

  const register = (instance: WCrud.Inst.WCrudInst) => {
    wCrudRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    onCreateAndOpen: () => wCrudRef.value?.onCreateAndOpen(),
    onReadAndOpen: async (id: StringOrNumber) =>
      await wCrudRef.value?.onReadAndOpen(id),
    onDelete: async (id: StringOrNumber) => await wCrudRef.value?.onDelete(id),
    onDeleteMany: async () => await wCrudRef.value?.onDeleteMany(),
  }

  return [register, methods]
}
