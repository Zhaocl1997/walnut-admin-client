import { easyThrottle } from 'easy-fns-ts'
import { nextTick, onMounted, onUnmounted } from 'vue'

import { ScreenEnum } from '/@/enums/screen'
import { useAppStore } from '/@/store'

export const useWindowResize = () => {
  const { dispatch } = useAppStore()

  const changeMenuState = () => {
    if (document.body.clientWidth < ScreenEnum.LG) {
      dispatch('app/commitMenuCollapse', true)
    } else {
      dispatch('app/commitMenuCollapse', false)
    }
  }

  const handler = easyThrottle(changeMenuState, 500)

  const registerEventHandler = () => {
    window.addEventListener('resize', handler, true)
  }

  const unregisterEventHandler = () => {
    window.removeEventListener('resize', handler, true)
  }

  onMounted(() => {
    registerEventHandler()

    nextTick(() => {
      changeMenuState()
    })
  })

  onUnmounted(() => {
    unregisterEventHandler()
  })
}
