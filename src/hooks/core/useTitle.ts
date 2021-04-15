import { useTitle as VueUseTitle } from '@vueuse/core'
import { getMaybeI18nMsg } from '/@/views/system/menu/utils'

/**
 * @description reactive document title
 */
export const useTitle = (val: MaybeRef<string>) => {
  const title = VueUseTitle()
  title.value = `${getMaybeI18nMsg(val)} - ${import.meta.env.VITE_APP_TITLE}`
}
