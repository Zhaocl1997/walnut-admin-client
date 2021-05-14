import type { Ref, ComputedRef } from 'vue'
import type { WTreeProps, ElTreeRef } from '../types'

export const useTreeCore = (
  props: ComputedRef<WTreeProps>,
  treeRef: Ref<Nullable<ElTreeRef>>
) => {
  // 1. `leafOnly`: Weather only child node，default false
  // 2. `includeHalfChecked`: Weather include half checked node，default false
  // 3. This function is the KEY to v-model when multiple is true
  const onGetCheckedNodes = () => {
    const res = treeRef.value!.getCheckedNodes(
      props.value.leafOnly as boolean,
      props.value.includeHalfChecked as boolean
    )

    return res.map((i) => i[props.value.props!.id!])
  }

  return { onGetCheckedNodes }
}
