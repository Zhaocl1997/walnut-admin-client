export const useAppDarkMode = () => {
  const appDark = useAppStoreDark()

  const isSystemDark = usePreferredDark()

  const setIsDark = (dark: boolean) => {
    const root = document.querySelector('html')

    if (dark) {
      root?.classList.add(AppConstDarkMode.DARK)
      root?.classList.remove(AppConstDarkMode.LIGHT)

      appDark.setIsDark(true)
    }
    else {
      root?.classList.add(AppConstDarkMode.LIGHT)
      root?.classList.remove(AppConstDarkMode.DARK)

      appDark.setIsDark(false)
    }
  }

  watchEffect(() => {
    switch (appDark.darkMode) {
      case AppConstDarkMode.LIGHT:
        setIsDark(false)
        break

      case AppConstDarkMode.DARK:
        setIsDark(true)
        break

      case AppConstDarkMode.SYSTEM:
        setIsDark(unref(isSystemDark))
        break

      default:
        break
    }
  })
}
