import type { ICompUITreeInst, ICompUITreeProps } from '../types'

export function useTree<T = RowData>(props: ICompUITreeProps<T>): [(inst: ICompUITreeInst<T>) => void, ICompUITreeInst<T>] {
  isInSetup()

  const wTreeRef = shallowRef<ICompUITreeInst<T>>()

  const register = (inst: ICompUITreeInst<T>): void => {
    wTreeRef.value = inst

    watchEffect(() => {
      inst.setProps!(props)
    })
  }

  const methods: ICompUITreeInst<T> = {
    setProps: props => wTreeRef.value?.setProps!(props),
  }

  return [register, methods]
}
