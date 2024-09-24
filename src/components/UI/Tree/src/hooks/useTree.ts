import type { ICompUITreeInst, ICompUITreeProps } from '../types'

export function useTree<T = RowData>(props: ICompUITreeProps<T>) {
  isInSetup()

  const wTreeRef = shallowRef<ICompUITreeInst<T>>()

  const register = (instance: ICompUITreeInst<T>) => {
    wTreeRef.value = instance

    watchEffect(() => {
      instance.setProps(props)
    })
  }

  const methods: Partial<ICompUITreeInst<T>> = {
    setProps: props => wTreeRef.value?.setProps(props),
  }

  return [register, methods]
}
