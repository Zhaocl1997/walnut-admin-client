/**
 * @description reactive document title
 */
export const useAppTitle = () => {
  const title = useTitle()

  const { t, locale } = useAppI18n()
  const { currentRoute } = useAppRouter()
  const { title: envTitle } = useAppEnv('title')

  watch(
    () => [currentRoute.value.path, locale, appDocumentVisibility],
    () => {
      try {
        if (appDocumentVisibility.value === 'hidden') {
          title.value = t('app.title')
        } else {
          const translateTitle = t(currentRoute.value.meta.title as string)
          title.value = `${translateTitle} - ${envTitle}`
        }
      } catch (error) {
        title.value = `${envTitle}`
      }
    },
    {
      deep: true,
      immediate: true,
    }
  )
}
