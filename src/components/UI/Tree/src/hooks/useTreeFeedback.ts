import type { ComputedRef, Ref } from 'vue'
import type { WTreeProps, ElTreeRef, TreeKey } from '../types'

import { nextTick, onMounted, watch } from 'vue'

import { easyIsEmpty, except } from 'easy-fns-ts'

export const useTreeFeedback = (
  props: ComputedRef<WTreeProps>,
  treeRef: Ref<Nullable<ElTreeRef>>,
  nodeKey: TreeKey
) => {
  // feedback
  const feedback = () => {
    if (props.value.includeHalfChecked) {
      return
    }

    if (easyIsEmpty(props.value.modelValue)) {
      if (props.value.multiple) {
        nextTick(() => {
          treeRef.value!.setCheckedKeys([])
        })
      } else {
        nextTick(() => {
          treeRef.value!.setCurrentKey(null)
        })
      }

      return
    }

    if (props.value.multiple) {
      const levelOneNodeIdArr = props.value.data!.map((i) => i[nodeKey])
      const val = except(props.value.modelValue as TreeKey[], levelOneNodeIdArr)

      setTimeout(() => {
        treeRef.value!.setCheckedKeys(val)
      }, 50)
    } else {
      setTimeout(() => {
        treeRef.value!.setCurrentKey(props.value.modelValue as TreeKey)
      }, 50)
    }
  }

  onMounted(() => {
    feedback()
  })

  watch(
    () => props.value.modelValue,
    () => {
      feedback()
    }
  )
}
