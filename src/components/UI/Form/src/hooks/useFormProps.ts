import { ref, unref, computed } from 'vue'
import { easyDeepMerge } from 'easy-fns-ts'
import { WFormProps } from '../types'

export const useFormProps = (props: WFormProps) => {
  const formProps = ref({})

  /**
   * @description set props exposed as a method
   */
  const setProps = (newProps: WFormProps) => {
    formProps.value = easyDeepMerge(unref(formProps), newProps)
  }

  /**
   * @description get form props
   */
  const getProps = computed(() => {
    return { ...props, ...unref(formProps) }
  })

  return {
    setProps,
    getProps,
  }
}
