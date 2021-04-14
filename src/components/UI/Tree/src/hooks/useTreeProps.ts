import type { WTreeProps } from '../types'

import { computed } from 'vue'

import { defaultTreeProp } from '../utils'

export const useTreeProps = (props: WTreeProps) => {
  const getProps = computed(() => {
    return {
      ...defaultTreeProp,
      ...props.props,
    }
  })

  const getNodeKey = computed(() => getProps.value.id)

  const getShowCheckbox = computed(() => props.multiple)

  const getDefaultExpandKeys = computed(() =>
    props.modelValue && getShowCheckbox.value ? props.modelValue : []
  )

  return {
    getProps,
    getNodeKey,
    getShowCheckbox,
    getDefaultExpandKeys,
  }
}
