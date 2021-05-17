import { useTitle as VueUseTitle } from '@vueuse/core'
import { getMaybeI18nMsg } from '/@/locales/utils'

/**
 * @description reactive document title
 */
export const useTitle = (val: string | undefined) => {
  if (!val) return
  const title = VueUseTitle()
  title.value = `${getMaybeI18nMsg(val)} - ${import.meta.env.VITE_APP_TITLE}`
}
