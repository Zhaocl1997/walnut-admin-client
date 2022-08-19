/**
 * @description reactive document title
 */
export const useAppTitle = () => {
  const title = useTitle()
  const visibility = useDocumentVisibility()

  const { t, locale } = useAppI18n()
  const { currentRoute } = useAppRouter()

  watch(
    () => [currentRoute.value.path, locale, visibility],
    () => {
      try {
        if (visibility.value === 'hidden') {
          title.value = t('app.title')
        } else {
          const translateTitle = t(currentRoute.value.meta.title as string)
          title.value = `${translateTitle} - ${import.meta.env.VITE_APP_TITLE}`
        }
      } catch (error) {
        title.value = `${import.meta.env.VITE_APP_TITLE}`
      }
    },
    {
      deep: true,
      immediate: true,
    }
  )
}
