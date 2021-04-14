import { ref } from 'vue'
import { tryOnUnMounted } from '/@/utils/shared'

export const useMediaQuery = (query: string) => {
  if (!window) {
    return ref(false)
  }

  const mediaQuery = window.matchMedia(query)
  const matches = ref(mediaQuery.matches)

  const handler = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }

  if ('addEventListener' in mediaQuery) {
    mediaQuery.addEventListener('change', handler)
  } else {
    // @ts-expect-error - fallback for Safari < 14 and older browsers
    mediaQuery.addListener(handler)
  }

  tryOnUnMounted(() => {
    if ('removeEventListener' in mediaQuery) {
      mediaQuery.removeEventListener('change', handler)
    } else {
      // @ts-expect-error - fallback for Safari < 14 and older browsers
      mediaQuery.removeListener(handler)
    }
  })

  return matches
}
