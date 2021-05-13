import { useFullscreen as VueUseFullScreen } from '@vueuse/core'
import { toggleClass } from 'easy-fns-ts'

export interface useFullScreenOptions {
  /**
   * @description Target to full screen
   */
  target?: string
}

export const useFullScreen = (opt: useFullScreenOptions) => {
  const el = document.querySelector(opt.target!)
  const { isFullscreen, toggle } = VueUseFullScreen(el)

  return {
    isFullscreen,
    toggleFullScreen: () => {
      toggle()
      if (opt.target !== '#app') {
        toggleClass(el as HTMLElement, 'bg-white p-4', !isFullscreen.value)
      }
    },
  }
}
