import type { AppTabItemInst } from '../types'

export const useTabsDot = () => {
  const itemInst = ref<AppTabItemInst>()

  const setItemRef = (el: any) => {
    if (el) {
      itemInst.value = el
    }
  }

  return {
    itemInst,
    setItemRef,
  }
}
