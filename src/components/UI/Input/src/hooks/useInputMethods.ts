import type { Ref } from 'vue'

/**
 * @description expose ElInput methods to outside
 */
export const useInputMethods = (inputRef: Ref<any>) => {
  const inputMethods = {
    focus: () => {
      inputRef.value.focus()
    },
    blur: () => {
      inputRef.value.blur()
    },
    select: () => {
      inputRef.value.select()
    },
  }

  return { inputMethods }
}
