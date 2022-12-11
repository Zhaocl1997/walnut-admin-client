import { getMergedTheme } from '@/App/src/naive/src/theme'

const appSetting = useAppStoreSetting()
const isReducedMotion = useSharedPreferredReducedMotion()

export const modalColor = computed(
  () => getMergedTheme.value?.Drawer.common?.modalColor
)

export const getCanAnimate = computed(
  () => isReducedMotion.value && appSetting.app.reducedMotion
)
