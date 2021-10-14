import { DarkModeEnum } from '/@/enums/dark'

export const useDarkMode = () => {
  const { app } = useAppContext()

  const isSystemDark = usePreferredDark()

  const setIsDark = (dark: boolean) => {
    const root = document.querySelector('html')

    if (dark) {
      root?.classList.add(DarkModeEnum.DARK)
      root?.classList.remove(DarkModeEnum.LIGHT)

      app.value.isDark = true
    } else {
      root?.classList.add(DarkModeEnum.LIGHT)
      root?.classList.remove(DarkModeEnum.DARK)

      app.value.isDark = false
    }
  }

  watchEffect(() => {
    switch (app.value.darkMode) {
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
    app,
  }
}
