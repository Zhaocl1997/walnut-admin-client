export const useAppDarkMode = () => {
  const { app } = useAppState()

  const isSystemDark = usePreferredDark()

  const setIsDark = (dark: boolean) => {
    const root = document.querySelector('html')

    if (dark) {
      root?.classList.add(DarkModeConst.DARK)
      root?.classList.remove(DarkModeConst.LIGHT)

      app.value.isDark = true
    } else {
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
}
