import type { WTree } from '../types'

import { isInSetup } from '/@/utils/shared'

export const useTree = <T = RowData>(
  props: WTree.Props<T>
): WTree.Hook.useTree<T> => {
  isInSetup()

  const wTreeRef = ref<Nullable<WTree.Inst.WTreeInst<T>>>(null)

  const register = (instance: WTree.Inst.WTreeInst<T>) => {
    wTreeRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: WTree.Inst.WTreeInst<T> = {
    setProps: (props) => wTreeRef.value?.setProps(props),
  }

  return [register, methods]
}
