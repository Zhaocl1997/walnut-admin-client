import type { WTreeExposedMethods } from '../../../Tree'
import type { CommonComponentMethods } from '../../../types'
import { reactive, toRefs, watch } from 'vue'
import { easyIsEmpty } from 'easy-fns-ts'
import { WSelectTreeProp } from '../types'

export const useSelectTreeCore = (props: WSelectTreeProp, emit: Fn) => {
  const state = reactive({
    selectValue: '' as any,
    optionValue: '' as any,
    treeValue: '' as any,
    wTreeRef: null as Nullable<WTreeExposedMethods>,
    elSelectRef: null,
  })

  // Select change handler
  // Used for label deleted or clear event on select
  const onSelectChange = (labels: string[]) => {
    if (easyIsEmpty(labels)) {
      state.wTreeRef!.expandAll(false)
    }

    const temp = []

    // Filter out the node base on deleted case on labels
    for (let i = 0; i < state.optionValue.length; i++) {
      for (let j = 0; j < labels.length; j++) {
        if (labels[j] === state.optionValue[i][props.props!.label as string]) {
          temp.push(state.optionValue[i])
        }
      }
    }

    const newV = temp.map((i) => i[props.props!.id!])

    emit('update:modelValue', newV)

    // manually operate check keys
    state.wTreeRef!.setCheckedKeys([])
    setTimeout(() => {
      newV.map((key) => {
        state.wTreeRef!.setChecked(key, true)
      })
    }, 0)
  }

  watch(
    () => state.treeValue,
    (newV) => {
      emit('update:modelValue', newV)

      // single
      if (!props.multiple) {
        // blur the dropdown
        ;(state.elSelectRef! as CommonComponentMethods).blur()

        setTimeout(() => {
          // update the displayed label
          const node = state.wTreeRef!.getCurrentNode()!

          if (node) {
            state.selectValue = node[props.props!.label as string]
          }
        }, 10)
      } else {
        // multiple
        setTimeout(() => {
          const res = state.wTreeRef!.getCheckedNodes()
          state.selectValue = res.map((i) => i[props.props!.label as string])
          state.optionValue = res
        }, 10)
      }
    },
    {
      deep: true,
      flush: 'post',
    }
  )

  watch(
    () => props.modelValue,
    (v) => {
      state.treeValue = v
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    ...toRefs(state),
    onSelectChange,
  }
}
