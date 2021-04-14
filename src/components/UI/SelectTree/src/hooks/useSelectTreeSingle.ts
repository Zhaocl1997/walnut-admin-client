import { nextTick } from 'vue'

export const useSelectTreeSingle = (props: any, args: any) => {
  const { elSelectRef, selectValue, treeValue, label, emit } = args

  // single
  const onNodeClick = (data: any, node: any, arr: any) => {
    if (props.multiple) {
      return
    }

    selectValue.value = data[label]

    emit('update:modelValue', treeValue.value)

    emit('change', node.data)

    nextTick(() => {
      elSelectRef.value.blur()
    })
  }

  return { onNodeClick }
}
