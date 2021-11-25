import type { WTable } from '../types'

import { isInSetup } from '/@/utils/shared'

export const useTable = <T>(
  props: DeepMaybeRefSelf<WTable.Props<T>>
): WTable.Hook.useTableReturnType => {
  isInSetup()

  const wTableRef = ref<Nullable<WTable.Inst.WTableInst>>(null)

  const register = (instance: WTable.Inst.WTableInst) => {
    wTableRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {
    onInit: () => wTableRef.value?.onInit(),
    onDeleteMany: () => wTableRef.value?.onDeleteMany(),
  } as WTable.Inst.WTableInst

  return [register, methods]
}
