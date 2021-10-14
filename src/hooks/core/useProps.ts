import { easyDeepMerge } from 'easy-fns-ts'

export const useProps = <T>(props: T) => {
  const propsRef = ref<T>()

  /**
   * @description set props exposed as a method
   */
  const setProps = (newProps: T) => {
    propsRef.value = easyDeepMerge(unref(propsRef), newProps)
  }

  /**
   * @description get form props
   */
  const getProps = computed<T>(() => {
    return { ...props, ...unref(propsRef) }
  })

  return {
    setProps,
    getProps,
  }
}
