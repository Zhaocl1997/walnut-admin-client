import { easyIsEmpty } from 'easy-fns-ts'
import { nextTick } from 'vue'

export const useSelectTreeMultiple = (props: any, args: any) => {
  const {
    selectValue,
    optionValue,
    treeValue,
    wTreeRef,
    emit,
    label,
    nodeKey,
  } = args

  // Select change handler
  // Beloew is used for label deleted or clear event on select
  const onSelectChange = (labels: string[]) => {
    // Below is handler for clear event
    if (easyIsEmpty(labels)) {
      wTreeRef.value.expandAll(false)

      nextTick(() => {
        emit('update:modelValue', props.multiple ? [] : '')
      })
    }

    const temp = []

    // Filter out the node base on deleted case on labels
    for (let i = 0; i < optionValue.value.length; i++) {
      for (let j = 0; j < labels.length; j++) {
        if (labels[j] === optionValue.value[i][label]) {
          temp.push(optionValue.value[i])
        }
      }
    }

    const newV = temp.map((i) => i[nodeKey])

    // reassign new value to tree value
    treeValue.value = newV
    emit('update:modelValue', newV)
  }

  // multiple
  const onCheckChange = () => {
    if (!props.multiple) {
      return
    }

    // Below purpose is to change select label when tree value is changed
    const res = wTreeRef.value.getCheckedNodes()
    selectValue.value = res.map((i: any) => i[label])

    // simply emit treeValue
    emit('update:modelValue', treeValue.value)
  }

  return {
    onSelectChange,
    onCheckChange,
  }
}
