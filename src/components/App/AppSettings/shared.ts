import { getMergedTheme } from '@/App/src/naive/src/theme'

const appSetting = useAppStoreSetting()

export const modalColor = computed(
  () => getMergedTheme.value?.Drawer.common?.modalColor
)

export const getCanAnimate = computed(
  () => _APP_CAN_SYSTEM_ANIMATE_.value && appSetting.app.reducedMotion
)
