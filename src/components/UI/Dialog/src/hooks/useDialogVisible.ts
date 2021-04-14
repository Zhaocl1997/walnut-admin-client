import type { WDialogProps } from '../types'
import { ref } from 'vue'

export const useDialogVisible = (props: WDialogProps) => {
  const visibleRef = ref(false)

  const onToggleVisible = (visible: boolean | undefined) => {
    if (visible === undefined) {
      visibleRef.value = !visibleRef.value
      return
    }
    visibleRef.value = visible
  }

  return {
    visibleRef,
    onToggleVisible,
  }
}
