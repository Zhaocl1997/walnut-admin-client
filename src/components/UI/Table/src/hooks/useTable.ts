import type { WTable } from '../types'
import type { MaybeRefRecord } from '/~/utils'

import { isInSetup } from '/@/utils/shared'

export const useTable = <T>(
  props: MaybeRefRecord<WTable.Props<T>>
): WTable.Hook.useTableReturnType => {
  isInSetup()

  const wTableRef = ref<Nullable<WTable.Inst.WTableInst>>(null)

  const register = (instance: WTable.Inst.WTableInst) => {
    wTableRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {}

  return [register, methods]
}
