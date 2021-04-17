import { tryOnMounted } from '@vueuse/shared'
import { useAppResize } from '/@/App/src/hooks/useAppResize'
import { useAppStore } from '/@/store'

export const useLayoutResize = () => {
  const { dispatch } = useAppStore()

  const changeMenuState = () => {
    if (breakpoints.isSmaller('lg')) {
      dispatch('app/commitMenuCollapse', true)
    } else {
      dispatch('app/commitMenuCollapse', false)
    }
  }

  const { breakpoints } = useAppResize(changeMenuState)

  tryOnMounted(() => changeMenuState())
}
