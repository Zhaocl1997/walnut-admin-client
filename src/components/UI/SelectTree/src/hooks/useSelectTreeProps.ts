import { computed } from 'vue'
import { defaultTreeProp } from '../../../Tree/src/utils'

export const useSelectTreeProps = (props: any) => {
  const getProps = computed(() => {
    return {
      ...defaultTreeProp,
      ...props.props,
    }
  })

  return {
    getProps,
    nodeKey: getProps.value.id,
    label: getProps.value.label,
    children: getProps.value.children,
  }
}
