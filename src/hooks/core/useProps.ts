import { cloneDeep, merge } from 'lodash-es'

export function useProps<P>(props: P) {
  const propsRef = ref<Partial<P>>()

  /**
   * @description set props
   */
  const setProps = (newProps: P) => {
    propsRef.value = merge(unref(propsRef), newProps)
  }

  /**
   * @description get props
   */
  const getProps = computed<P>(() => ({ ...props, ...unref(propsRef) }))

  return { setProps, getProps }
}

export type IHooksUseProps<P> = ReturnType<typeof useProps<P>>
