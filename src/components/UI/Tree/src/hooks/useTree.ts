import type { WTreeExposedMethods, WTreeProps } from '../types'

import { ref, watchEffect } from 'vue'

import { isInSetup } from '/@/utils/shared'

export const useTree = <T>(props?: WTreeProps<T>) => {
  isInSetup()

  const treeRef = ref<Nullable<WTreeExposedMethods<T>>>(null)

  const register = (instance: WTreeExposedMethods<T>) => {
    treeRef.value = instance

    watchEffect(() => {
      props && instance.setProps!(props)
    })
  }

  const methods: WTreeExposedMethods<T> = {
    updateKeyChildren: (...args) => treeRef.value?.updateKeyChildren(...args),
    // expandAll: (val: boolean) => {
    //   treeRef.value!.expandAll!(val)
    // },
  }

  return [register, methods] as const
}
