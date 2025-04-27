// TODO rewrite
export function useProps<P>(props: P) {
  const propsRef = ref<Partial<P>>()

  /**
   * @description set props
   */
  const setProps = (newProps: Partial<P>) => {
    propsRef.value = { ...unref(propsRef), ...newProps }
  }

  /**
   * @description get props
   */
  const getProps = computed<P>(() => ({ ...props, ...unref(propsRef) }))

  return { setProps, getProps }
}

export type IHooksUseProps<P> = ReturnType<typeof useProps<P>>
