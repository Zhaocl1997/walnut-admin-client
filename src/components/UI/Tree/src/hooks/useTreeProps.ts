import type { WTreeProps } from '../types'

import { computed } from 'vue'

import { defaultTreeProp } from '../utils'

export const useTreeProps = (props: WTreeProps) => {
  const getTreeProps = computed(() => ({
    ...defaultTreeProp,
    ...props.props,
  }))

  const getNodeKey = computed(() => getTreeProps.value.id)

  const getShowCheckbox = computed(() => props.multiple)

  const getDefaultExpandKeys = computed(() =>
    props.modelValue && getShowCheckbox.value ? props.modelValue : []
  )

  return {
    getTreeProps,
    getNodeKey,
    getShowCheckbox,
    getDefaultExpandKeys,
  }
}
