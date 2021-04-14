import type { ComputedRef, Ref } from 'vue'
import type { ElTreeMethods } from '../types/methods'
import type { WTreeProps } from '../types'

import { nextTick, onMounted, watch } from 'vue'

import { easyIsEmpty, except } from 'easy-fns-ts'

export const useTreeFeedback = (
  props: WTreeProps,
  treeRef: Ref<Nullable<ElTreeMethods>>,
  nodeKey: ComputedRef
) => {
  // feedback
  const feedback = () => {
    if (props.includeHalfChecked) {
      return
    }

    if (easyIsEmpty(props.modelValue)) {
      if (props.multiple) {
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

    if (props.multiple) {
      const levelOneNodeIdArr = props.data!.map((i) => i[nodeKey.value])
      const val = except(props.modelValue!, levelOneNodeIdArr)

      setTimeout(() => {
        treeRef.value!.setCheckedKeys(val)
      }, 50)
    } else {
      setTimeout(() => {
        treeRef.value!.setCurrentKey(props.modelValue)
      }, 50)
    }
  }

  onMounted(() => {
    feedback()
  })

  watch(
    () => props.modelValue,
    () => {
      feedback()
    }
  )
}
