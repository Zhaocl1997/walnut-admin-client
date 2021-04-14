import { unref, watchEffect } from 'vue'
import { useAppGlobalConfig } from '../../../App/AppConfig'
import { DarkModeEnum } from '/@/enums/dark'
import { usePreferredDark } from '/@/hooks/core/usePreferredDark'

export const useDarkMode = () => {
  const { getAppGlobalConfig } = useAppGlobalConfig()
  const { isDark, darkMode } = getAppGlobalConfig()

  const isSystemDark = usePreferredDark()

  const setIsDark = (dark: boolean) => {
    const root = document.querySelector('html')

    if (dark) {
      root?.classList.add(DarkModeEnum.DARK)
      root?.classList.remove(DarkModeEnum.LIGHT)
      isDark.value = true
    } else {
      root?.classList.add(DarkModeEnum.LIGHT)
      root?.classList.remove(DarkModeEnum.DARK)
      isDark.value = false
    }
  }

  watchEffect(() => {
    switch (darkMode.value) {
      case DarkModeEnum.LIGHT:
        setIsDark(false)
        break

      case DarkModeEnum.DARK:
        setIsDark(true)
        break

      case DarkModeEnum.SYSTEM:
        setIsDark(unref(isSystemDark))
        break

      default:
        break
    }
  })

  return {
    isDark,
    darkMode,
  }
}
