import type { Driver, DriveStep } from 'driver.js'
import { driver } from 'driver.js'

export function useDriver(steps: DriveStep[]) {
  const driverInst = shallowRef<Driver>()

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
    doneBtnText: t('app.intro.done'),
    nextBtnText: t('app.intro.next'),
    prevBtnText: t('app.intro.prev'),
    steps,
  })

  function onDrive() {
    driverInst.value?.drive()
  }

  function onDestory() {
    driverInst.value?.destroy()
  }

  tryOnUnmounted(onDestory)

  return { onDrive, onDestory }
}
