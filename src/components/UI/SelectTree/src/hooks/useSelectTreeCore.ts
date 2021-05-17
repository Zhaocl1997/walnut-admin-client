import type { WTreeExposedMethods } from '../../../Tree'
import type { CommonComponentMethods } from '../../../types'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { easyIsEmpty } from 'easy-fns-ts'
import { WSelectTreeProp } from '../types'

export const useSelectTreeCore = (props: WSelectTreeProp, emit: Fn) => {
  const state = reactive({
    selectValue: '' as any,
    optionValue: '' as any,
    treeValue: '',
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
          state.selectValue = state.wTreeRef!.getCurrentNode()![
            props.props!.label as string
          ]
        }, 0)
      } else {
        // multiple
        setTimeout(() => {
          const res = state.wTreeRef!.getCheckedNodes()
          state.selectValue = res.map((i) => i[props.props!.label as string])
          state.optionValue = res
        }, 0)
      }
    },
    {
      deep: true,
      flush: 'post',
    }
  )

  onMounted(() => {
    state.treeValue = props.modelValue as string
  })

  return {
    ...toRefs(state),
    onSelectChange,
  }
}
