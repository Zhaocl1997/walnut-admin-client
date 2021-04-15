import { useFullscreen } from '@vueuse/core'

export interface useScreenFullOptions {
  /**
   * @description Target to full screen
   */
  target?: string
}

export const useScreenfull = (props: useScreenFullOptions) => {
  const el = document.querySelector(props.target!)
  const { isFullscreen, toggle } = useFullscreen(el)

  return {
    isFullscreen,
    onToggleScreenfull: toggle,
  }
}
