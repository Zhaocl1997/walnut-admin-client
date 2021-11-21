export const useProps = <T>(props: T) => {
  const propsRef = ref<Partial<T>>()

  /**
   * @description set props exposed as a method
   */
  const setProps = (newProps: Partial<T>) => {
    propsRef.value = { ...unref(propsRef), ...newProps }
  }

  /**
   * @description get props
   */
  const getProps = computed<T>(() => ({ ...props, ...unref(propsRef) }))

  return {
    setProps,
    getProps,
  }
}
