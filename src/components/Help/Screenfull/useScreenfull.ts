import screenfull from 'screenfull'
import { toggleClass } from 'easy-fns-ts'

import { ref } from 'vue'
import { tryOnMounted, tryOnUnMounted } from '/@/utils/shared'

export const useScreenfull = (props: any) => {
  const isFullscreen = ref(false)

  const change = () => {
    // @ts-ignore
    isFullscreen.value = screenfull.isFullscreen

    // If not default target, toggle a class name on target
    if (props.target !== '#app') {
      const ele = document.querySelector(props.target)
      toggleClass(ele, 'w-screenfull', isFullscreen.value)
    }
  }

  const init = () => {
    if (screenfull.isEnabled) {
      screenfull.on('change', change)
    }
  }

  const destroy = () => {
    if (screenfull.isEnabled) {
      screenfull.off('change', change)
    }
  }

  const onToggleScreenfull = () => {
    if (!screenfull.isEnabled) {
      alert('Your broswer do not support for screen full!')
      return false
    }

    // manually toggle screen full
    const ele = document.querySelector(props.target)

    screenfull.toggle(ele)
  }

  tryOnMounted(init)
  tryOnUnMounted(destroy)

  return {
    isFullscreen,
    onToggleScreenfull,
  }
}
