import type { WDialogProps } from '../types'
import { ref, unref, computed } from 'vue'
import { easyDeepMerge } from 'easy-fns-ts'

export const useDialogProps = (props: WDialogProps) => {
  const tableProps = ref({})

  /**
   * @description set props exposed as a method
   */
  const setProps = (newProps: WDialogProps) => {
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
