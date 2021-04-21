import { tryOnMounted } from '@vueuse/core'

import { useAppContext } from '/@/App'
import { useResize } from '/@/hooks/core/useResize'
import { useBreakpoints } from '/@/hooks/core/useBreakpoints'

export const useAppResize = () => {
  const { app } = useAppContext()
  const breakpoints = useBreakpoints()

  const handler = () => {
    if (breakpoints.isSmaller('sm')) {
      // when mobile
      // 1.isMobile => true
      // 2.device => 'mobile'
      // 3.no more collapse
      // 4.show aside drawer
      app.value.isMobile = true
      app.value.device = 'mobile'
      app.value.collapse = false
      app.value.showAside = true
    }

    if (breakpoints.isInBetween('sm', 'lg')) {
      // when tablet
      // 1.isMobile => false
      // 2.device => 'tablet'
      // 3.auto collapse
      app.value.isMobile = false
      app.value.device = 'tablet'
      app.value.collapse = true
    }

    if (breakpoints.isInBetween('lg', 'xl')) {
      // when laptop
      // 1.isMobile => false
      // 2.device => 'laptop'
      // 3.no collapse
      app.value.isMobile = false
      app.value.device = 'laptop'
      app.value.collapse = false
    }

    if (breakpoints.isGreater('2xl')) {
      // when desktop
      // 1.isMobile => false
      // 2.device => 'desktop'
      // 3.no collapse
      app.value.isMobile = false
      app.value.device = 'desktop'
      app.value.collapse = false
    }
  }

  useResize(handler)

  tryOnMounted(() => handler())

  return { app }
}
