import type { WTableProps } from '../types'
import { ref, unref, computed } from 'vue'
import { easyDeepMerge } from 'easy-fns-ts'

export const useTableProps = (props: WTableProps) => {
  const tableProps = ref({})

  /**
   * @description set props exposed as a method
   */
  const setProps = (newProps: WTableProps) => {
    tableProps.value = easyDeepMerge(unref(tableProps), newProps)
  }

  /**
   * @description get form props
   */
  const getProps = computed(() => {
    return { ...props, ...unref(tableProps) }
  })

  return {
    setProps,
    getProps,
  }
}
