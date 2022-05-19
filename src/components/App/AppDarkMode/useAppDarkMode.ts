export const useAppDarkMode = () => {
  const appDark = useAppDarkStore()

  const isSystemDark = usePreferredDark()

  const setIsDark = (dark: boolean) => {
    const root = document.querySelector('html')

    if (dark) {
      root?.classList.add(DarkModeConst.DARK)
      root?.classList.remove(DarkModeConst.LIGHT)

      appDark.setIsDark(true)
    } else {
      root?.classList.add(DarkModeConst.LIGHT)
      root?.classList.remove(DarkModeConst.DARK)

      appDark.setIsDark(false)
    }
  }

  watchEffect(() => {
    switch (appDark.darkMode) {
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
