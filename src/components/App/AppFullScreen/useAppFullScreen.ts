import type { MaybeElementRef } from '@vueuse/core'
import { toggleClass } from 'easy-fns-ts'

export interface useFullScreenOptions {
  /**
   * @description Target to full screen
   */
  target?: string
}

export const useAppFullScreen = (opt: useFullScreenOptions) => {
  const el = document.querySelector(opt.target!) as MaybeElementRef
  const { isFullscreen, toggle } = useFullscreen(el)

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
