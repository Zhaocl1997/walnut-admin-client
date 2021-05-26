import { watch } from 'vue'
import { useTitle as VueUseTitle } from '@vueuse/core'
import { useAppRouter } from '/@/router'
import { useI18n } from '/@/locales'

/**
 * @description reactive document title
 */
export const useTitle = () => {
  const title = VueUseTitle()

  const { t } = useI18n()
  const { currentRoute } = useAppRouter()

  watch(
    () => currentRoute.value.path,
    () => {
      const translateTitle = t(currentRoute.value.meta.title as string)

      title.value = translateTitle
        ? `${translateTitle} - ${import.meta.env.VITE_APP_TITLE}`
        : `${import.meta.env.VITE_APP_TITLE}`
    },
    {
      immediate: true,
    }
  )
}
