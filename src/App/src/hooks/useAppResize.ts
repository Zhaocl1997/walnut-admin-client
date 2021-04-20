import { tryOnMounted } from '@vueuse/core'

import { getAppContext } from '/@/App'
import { useResize } from '/@/hooks/core/useResize'
import { useBreakpoints } from '/@/hooks/core/useBreakpoints'

export const useAppResize = () => {
  const { app } = getAppContext()
  const breakpoints = useBreakpoints()

  const handler = () => {
    // mobile
    if (breakpoints.isSmaller('sm')) {
      app.value.collapse = true
      app.value.device = 'mobile'
      app.value.canShowAside = false
      app.value.isMobile = true
    }

    // tablet
    if (breakpoints.isInBetween('sm', 'lg')) {
      app.value.collapse = true
      app.value.device = 'tablet'
      app.value.canShowAside = true
      app.value.isMobile = false
    }

    // laptop
    if (breakpoints.isInBetween('lg', 'xl')) {
      app.value.collapse = false
      app.value.device = 'laptop'
      app.value.canShowAside = true
      app.value.isMobile = false
    }

    // desktop
    if (breakpoints.isGreater('2xl')) {
      app.value.collapse = false
      app.value.device = 'desktop'
      app.value.canShowAside = true
      app.value.isMobile = false
    }
  }

  useResize(handler)

  tryOnMounted(() => handler())

  return { app }
}
