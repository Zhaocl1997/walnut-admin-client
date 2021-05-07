import type { Ref } from 'vue'
import type { ElInputRef } from '../types'

/**
 * @description expose ElInput methods to outside
 */
export const useInputMethods = (inputRef: Ref<Nullable<ElInputRef>>) => {
  const inputMethods = {
    focus: () => {
      inputRef.value!.focus()
    },
    blur: () => {
      inputRef.value!.blur()
    },
    select: () => {
      inputRef.value!.select()
    },
  }

  return { inputMethods }
}
