import { ref, unref, watch } from 'vue'
import { isString } from 'easy-fns-ts'

import { getTitle } from '/@/views/system/menu/utils'

/**
 * @description reactive document title
 */
export const useTitle = (title: MaybeRef<string>) => {
  const titleRef = ref(title ?? document.title ?? null)

  watch(
    () => unref(titleRef),
    (n, o) => {
      if (n !== o && isString(n)) {
        document.title = `${getTitle(n)} - ${import.meta.env.VITE_APP_TITLE}`
      }
    },
    { immediate: true }
  )

  return { title: titleRef }
}
