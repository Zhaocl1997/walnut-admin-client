import type { MaybeElementRef } from '@vueuse/core'
import { toggleClass } from 'easy-fns-ts'

const { app } = useAppState()

export const useFullScreenExtend = () => {
  const el = computed(
    () => document.querySelector(app.value.fullscreenTarget) as MaybeElementRef
  )
  const { isFullscreen, toggle, enter } = useFullscreen(el as Ref<HTMLElement>)

  watchEffect(
    () => {
      if (app.value.fullscreenTarget !== '#app') {
        toggleClass(
          el.value as HTMLElement,
          'bg-bodyColor p-4',
          app.value.isFullScreen
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
