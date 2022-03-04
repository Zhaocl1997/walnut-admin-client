import type { WTree } from '../types'

import { isInSetup } from '/@/utils/shared'

export const useTree = <T>(props: WTree.Props): WTree.Hook.useTree => {
  isInSetup()

  const wTreeRef = ref<Nullable<WTree.Inst.WTreeInst>>(null)

  const register = (instance: WTree.Inst.WTreeInst) => {
    wTreeRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {}

  return [register, methods]
}
