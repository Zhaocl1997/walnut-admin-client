import { defaultTheme } from '/@/settings/theme'

export const useDarkMode = () => {
  const { app, settings } = useAppState()

  const isSystemDark = usePreferredDark()

  const setIsDark = (dark: boolean) => {
    const root = document.querySelector('html')

    if (dark) {
      settings.value.ForDevelopers.themes = Object.assign(
        settings.value.ForDevelopers.themes,
        defaultTheme.dark
      )

      root?.classList.add(DarkModeConst.DARK)
      root?.classList.remove(DarkModeConst.LIGHT)

      app.value.isDark = true
    } else {
      settings.value.ForDevelopers.themes = Object.assign(
        settings.value.ForDevelopers.themes,
        defaultTheme.light
      )

      root?.classList.add(DarkModeConst.LIGHT)
      root?.classList.remove(DarkModeConst.DARK)

      app.value.isDark = false
    }
  }

  watchEffect(() => {
    switch (app.value.darkMode) {
      case DarkModeConst.LIGHT:
        setIsDark(false)
        break

      case DarkModeConst.DARK:
        setIsDark(true)
        break

      case DarkModeConst.SYSTEM:
        setIsDark(unref(isSystemDark))
        break

      default:
        break
    }
  })

  return {
    app,
  }
}
