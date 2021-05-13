import { onMounted, watch } from 'vue'
import { findNode } from 'easy-fns-ts'

export const useSelectTreeFeedback = (props: any, args: any) => {
  const { selectValue, optionValue, treeValue, nodeKey, label, children } = args

  // feedback
  const feedback = () => {
    if (props.data.length == 0) {
      return
    }

    if (!props.modelValue) {
      selectValue.value = ''
      optionValue.value = []
      return
    }

    if (props.multiple) {
      const tagArray: string[] = []
      const nodeArray: any[] = []

      props.modelValue.map((i: StringOrNumber) => {
        const node = findNode(props.data, (n: any) => n[nodeKey] === i, {
          id: nodeKey,
          children: children,
        })

        nodeArray.push(node)
        tagArray.push(node[label])
      })

      selectValue.value = tagArray
      optionValue.value = nodeArray
      treeValue.value = props.modelValue
    } else {
      const node = findNode(
        props.data,
        (n: any) => n[nodeKey] === props.modelValue,
        {
          id: nodeKey,
          children: children,
        }
      )

      selectValue.value = node[label]
      optionValue.value = [node]
      treeValue.value = props.modelValue
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
