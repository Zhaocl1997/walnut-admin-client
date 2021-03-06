import { watch } from 'vue'
import { useTitle as VueUseTitle } from '@vueuse/core'
import { useAppRouter } from '/@/router'
import { useI18n } from '/@/locales'

/**
 * @description reactive document title
 */
export const useTitle = () => {
  const title = VueUseTitle()

  const { t, locale } = useI18n()
  const { currentRoute } = useAppRouter()

  watch(
    () => [currentRoute.value.path, locale],
    () => {
      try {
        const translateTitle = t(currentRoute.value.meta.title as string)
        title.value = `${translateTitle} - ${import.meta.env.VITE_APP_TITLE}`
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
