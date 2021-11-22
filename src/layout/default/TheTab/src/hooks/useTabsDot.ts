import type { TabDotInst } from '../components/dot'

export const useTabsDot = () => {
  const item = ref<TabDotInst>()

  const setItemRef = (el: any) => {
    if (el) {
      item.value = el
    }
  }

  const startBounce = () => {
    item.value!.start()
  }

  const stopBounce = () => {
    item.value!.stop()
  }

  return {
    setItemRef,
    startBounce,
    stopBounce,
  }
}
