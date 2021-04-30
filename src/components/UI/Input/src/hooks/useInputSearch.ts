import type { WInputProps } from '../types'
import { useDebounceFn } from '@vueuse/core'

/**
 * @description debounce search emit
 */
export const useInputSearch = (props: WInputProps, emit: Fn) => {
  const debouncedSearch = useDebounceFn(() => {
    emit('search', props.modelValue)
  }, props.debounce)

  const emitSearch = () => {
    props.debounce !== 0 && debouncedSearch()
  }

  return { emitSearch }
}
