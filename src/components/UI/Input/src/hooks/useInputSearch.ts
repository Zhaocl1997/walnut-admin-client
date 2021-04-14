import type { WInputProps } from '../types'
import { easyDebounce } from 'easy-fns-ts'

/**
 * @description debounce search emit
 */
export const useInputSearch = (props: WInputProps, emit: Fn) => {
  const debouncedSearch = easyDebounce(() => {
    emit('search', props.modelValue)
  }, props.debounce)

  const emitSearch = () => {
    if (props.debounce !== 0) {
      debouncedSearch()
    }
  }

  return { emitSearch }
}
