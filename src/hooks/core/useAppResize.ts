import { useResize } from './useResize'
import { useBreakpoints } from './useBreakpoints'

export const useAppResize = () => {
  const { appMemo, settings } = useAppState()
  const appSetting = settings.value.ForDevelopers.app
  const breakpoints = useBreakpoints()

  const handler = () => {
    if (breakpoints.isSmaller('sm')) {
      // when mobile
      // 1.isMobile => true
      // 2.device => 'mobile'
      // 3.no more collapse
      // 4.mobile only show `left-menu` layout
      appMemo.value.isMobile = true
      appMemo.value.device = DevideConst.MOBILE
      appMemo.value.collapse = false
      appSetting.layout = AppLayoutModeConst.LEFT_MENU
    }

    if (breakpoints.isInBetween('sm', 'lg')) {
      // when tablet
      // 1.isMobile => false
      // 2.device => 'tablet'
      // 3.auto collapse
      appMemo.value.isMobile = false
      appMemo.value.device = DevideConst.TABLET
      appMemo.value.collapse = true
    }

    if (breakpoints.isInBetween('lg', 'xl')) {
      // when laptop
      // 1.isMobile => false
      // 2.device => 'laptop'
      // 3.no collapse
      appMemo.value.isMobile = false
      appMemo.value.device = DevideConst.LAPTOP
      appMemo.value.collapse = false
    }

    if (breakpoints.isGreater('xl')) {
      // when desktop
      // 1.isMobile => false
      // 2.device => 'desktop'
      // 3.no collapse
      appMemo.value.isMobile = false
      appMemo.value.device = DevideConst.DESKTOP
      appMemo.value.collapse = false
    }
  }

  useResize(handler)

  tryOnMounted(() => handler())
}
