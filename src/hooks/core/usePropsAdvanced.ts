import { cloneDeep, merge } from 'lodash-es'

export const usePropsAdvanced = <T>(props: T) => {
  const propsRef = ref<Partial<T>>()

  /**
   * @description set props
   */
  const setProps = (newProps: Partial<T>) => {
    propsRef.value = merge(cloneDeep(unref(propsRef)), newProps)
  }

  /**
   * @description get props
   */
  const getProps = computed<T>(() =>
    merge(cloneDeep(unref(props)), unref(propsRef))
  )

  return {
    setProps,
    getProps,
  }
}
