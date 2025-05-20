import { getMergedTheme } from '@/App/src/naive/src/theme'

const appSetting = useAppStoreSetting()
const isReducedMotion = useSharedPreferredReducedMotion()

export const modalColor = computed(
  () => getMergedTheme.value?.Drawer.common?.modalColor as string,
)

export const getCanAnimate = computed(
  () => isReducedMotion.value && appSetting.app.reducedMotion as boolean,
)
