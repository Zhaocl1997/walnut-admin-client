import { getMergedTheme } from '@/App/src/naive/src/theme'

const appSetting = useAppStoreSetting()

export const modalColor = computed(() => getMergedTheme.value.common.bodyColor)

export const getCanAnimate = computed(
  () => _APP_CAN_SYSTEM_ANIMATE_.value && appSetting.app.reducedMotion
)
