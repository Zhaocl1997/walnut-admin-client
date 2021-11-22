import type { MaybeElementRef } from '@vueuse/core'
import { toggleClass } from 'easy-fns-ts'

const { appMemo } = useAppState()

export const useFullScreenExtend = () => {
  const el = computed(
    () =>
      document.querySelector(appMemo.value.fullscreenTarget) as MaybeElementRef
  )
  const { isFullscreen, toggle, enter } = useFullscreen(el as Ref<HTMLElement>)

  watchEffect(
    () => {
      if (appMemo.value.fullscreenTarget !== '#app') {
        toggleClass(
          el.value as HTMLElement,
          'bg-bodyColor p-4',
          appMemo.value.isFullScreen
        )
      }
    },
    { flush: 'post' }
  )

  return {
    isFullscreen,
    toggle,
    enter,
  }
}
