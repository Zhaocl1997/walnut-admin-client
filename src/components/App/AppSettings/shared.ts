import { getMergedTheme } from '@/App/src/naive/src/theme'

export const modalColor = computed(
  () => getMergedTheme.value?.Drawer.common?.modalColor
)

export const appSetting = useAppStoreSetting()
export const lightThemeRelatives = ref(appSetting.settings.themes.light)
export const darkThemeRelatives = ref(appSetting.settings.themes.dark)
export const appRelatives = ref(appSetting.settings.app)
export const menuRelatives = ref(appSetting.settings.menu)
export const headerRelatives = ref(appSetting.settings.header)
export const breadcrumbRelatives = ref(appSetting.settings.breadcrumb)
export const tabRelatives = ref(appSetting.settings.tab)
