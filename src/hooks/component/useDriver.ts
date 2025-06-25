import type { Driver, DriveStep } from 'driver.js'
import { driver } from 'driver.js'

export function useDriver(key: string, steps: DriveStep[]) {
  const driverInst = shallowRef<Driver>()

  const cookieKey = `driver-${key}`

  const { t } = useAppI18n()

  watch(() => isDark.value, (v) => {
    if (v) {
      import('./driver-dark.css')
    }
    else {
      import('driver.js/dist/driver.css')
    }
  }, { immediate: true })

  driverInst.value = driver({
    animate: true,
    showProgress: true,
    disableActiveInteraction: true,
    allowClose: false,
    onNextClick() {
      if (!driverInst.value?.hasNextStep()) {
        setCookie(cookieKey, true, 60 * 60 * 24 * 30)
      }
      driverInst.value?.moveNext()
    },
    doneBtnText: t('app.intro.done'),
    nextBtnText: t('app.intro.next'),
    prevBtnText: t('app.intro.prev'),
    steps,
  })

  function onDrive() {
    const showDriver = getCookie(cookieKey)
    if (!showDriver) {
      driverInst.value?.drive()
    }
  }

  function onDestory() {
    driverInst.value?.destroy()
  }

  tryOnUnmounted(onDestory)

  return { onDrive, onDestory }
}
