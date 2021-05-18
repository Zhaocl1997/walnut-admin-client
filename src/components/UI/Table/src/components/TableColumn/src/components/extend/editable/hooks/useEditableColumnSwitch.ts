import type { ComputedRef } from 'vue'

import { ref, computed } from 'vue'
import { isFunction } from 'easy-fns-ts'

import { wTableWarning } from '/@/components/UI/Table/src/utils'

export const useEditableColumnSwitch = (
  getComponentType: ComputedRef<string | undefined>,
  getComponentProps: ComputedRef
) => {
  const switchLoading = ref(false)

  const switchLoadStart = () => (switchLoading.value = true)
  const switchLoadEnd = () => (switchLoading.value = false)

  const isSwitchType = computed(() => getComponentType.value === 'switch')

  if (isSwitchType.value) {
    if (!isFunction(getComponentProps.value?.beforeChange)) {
      wTableWarning(
        'Should provide `beforeChange` prop in `editTypeComponentProps` for change when use `switch` type editable cell!'
      )
    }
  }

  return {
    switchLoading,
    switchLoadStart,
    switchLoadEnd,
    isSwitchType,
  }
}
