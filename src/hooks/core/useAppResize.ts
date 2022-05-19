import { useResize } from './useResize'
import { useBreakpoints } from './useBreakpoints'

export const useAppResize = () => {
  const appAdapter = useAppAdapterStore()
  const appMenu = useAppMenuStore()

  const breakpoints = useBreakpoints()

  const handler = () => {
    if (breakpoints.isSmaller('sm')) {
      // when mobile
      // 1.isMobile => true
      // 2.device => 'mobile'
      // 3.no more collapse
      // 4.mobile only show `left-menu` layout
      appAdapter.setIsMobile(true)
      appAdapter.setDevice(DevideConst.MOBILE)
      appMenu.setCollapse(false)
      // appSetting.settings.app.layout = AppLayoutModeConst.LEFT_MENU
    }

    if (breakpoints.isInBetween('sm', 'lg')) {
      // when tablet
      // 1.isMobile => false
      // 2.device => 'tablet'
      // 3.auto collapse
      appAdapter.setIsMobile(false)
      appAdapter.setDevice(DevideConst.TABLET)
      appMenu.setCollapse(true)
    }

    if (breakpoints.isInBetween('lg', 'xl')) {
      // when laptop
      // 1.isMobile => false
      // 2.device => 'laptop'
      // 3.no collapse
      appAdapter.setIsMobile(false)
      appAdapter.setDevice(DevideConst.LAPTOP)
      appMenu.setCollapse(false)
    }

    if (breakpoints.isGreater('xl')) {
      // when desktop
      // 1.isMobile => false
      // 2.device => 'desktop'
      // 3.no collapse
      appAdapter.setIsMobile(false)
      appAdapter.setDevice(DevideConst.DESKTOP)
      appMenu.setCollapse(false)
    }
  }

  useResize(handler)

  tryOnMounted(() => handler())
}
