export const useTabStyle = (settings: AppSettings) => {
  const { currentRoute } = useAppRouter()

  const tabSettings = settings.tab

  const getTabStyle = (item: AppTab) => ({
    'text-primary hover:text-primaryHover':
      currentRoute.value.name === item.name,

    /* card */
    'border border-gray-400 hover:border-primaryHover hover:text-primaryHover':
      tabSettings.styleMode === TabStyleModeConst.CARD,
    'border-primary':
      currentRoute.value.name === item.name &&
      tabSettings.styleMode === TabStyleModeConst.CARD,

    /* flex */
    'bg-green-50 bg-opacity-5 hover:bg-green-100 hover:bg-opacity-10':
      tabSettings.styleMode === TabStyleModeConst.FLEX,
    'bg-green-200 bg-opacity-10 border-b-2 border-primary':
      currentRoute.value.name === item.name &&
      tabSettings.styleMode === TabStyleModeConst.FLEX,

    /* round */
    'bg-green-50 bg-opacity-5 hover:bg-green-100 hover:bg-opacity-10 rounded-t-xl':
      tabSettings.styleMode === TabStyleModeConst.ROUND,
    'bg-green-200 bg-opacity-10 border-l-1 border-primary':
      currentRoute.value.name === item.name &&
      tabSettings.styleMode === TabStyleModeConst.ROUND,
  })

  return { getTabStyle }
}
