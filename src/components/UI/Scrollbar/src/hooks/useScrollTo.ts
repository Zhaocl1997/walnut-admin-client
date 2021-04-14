import type { ScrollBarMode, ScrollToParams } from '../types'
import { ScrollModeEnum, ScrollPropEnum } from '../types'

import { ref, unref } from 'vue'
import { isFunction } from 'easy-fns-ts'

/**
 * @description Animate math function
 */
const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

/**
 * @description Get scroll field prop by mode
 */
const getField = (mode: ScrollBarMode): string => {
  return mode === ScrollModeEnum.HORIZONTAL
    ? ScrollPropEnum.SCROLLTOP
    : ScrollPropEnum.SCROLLLEFT
}

/**
 * @description Set corresponding field on scroll target
 */
const move = (el: HTMLElement, amount: number, mode: ScrollBarMode) => {
  ;(el as any)[getField(mode)] = amount
}

/**
 * @description Get init corresponding field value
 */
const position = (el: HTMLElement, mode: ScrollBarMode): number => {
  return (el as any)[getField(mode)]
}

/**
 * @description ScrollTo core
 */
export const useScrollTo = ({
  el,
  to,
  duration = 500,
  mode = ScrollModeEnum.HORIZONTAL,
  callback,
}: ScrollToParams) => {
  const isActiveRef = ref(false)
  const start = position(el, mode)
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = !duration ? 500 : duration

  const animateScroll = () => {
    if (!unref(isActiveRef)) {
      return
    }
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    move(el, val, mode)
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll)
    } else {
      if (callback && isFunction(callback)) {
        callback()
      }
    }
  }
  const run = () => {
    isActiveRef.value = true
    animateScroll()
  }

  const stop = () => {
    isActiveRef.value = false
  }

  return { start: run, stop }
}
