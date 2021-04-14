import type { ComputedRef, Ref } from 'vue'
import type { WTreeProps } from '../types'
import type { ElTreeRef } from '../types/ref'

export const useTreeCore = (
  props: WTreeProps,
  treeRef: Ref<Nullable<ElTreeRef>>,
  nodeKey: ComputedRef
) => {
  // 1. Weather only child node，default false
  // 2. Weather include half checked node，default false
  // 3. This function is the KEY to v-model when multiple is true
  const onGetCheckedNodes = () => {
    const res = treeRef.value!.getCheckedNodes(
      props.leafOnly,
      props.includeHalfChecked
    )

    return res.map((i) => i[nodeKey.value])
  }

  return { onGetCheckedNodes }
}
