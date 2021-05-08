import type { WTableEditableColumnSwitch } from '/@/components/UI/Table'
import type { WTableEditableColumnHookProps } from '../type'

import { ref } from 'vue'
import { isFunction } from 'easy-fns-ts'

import { wTableWarning } from '/@/components/UI/Table/src/utils'

export const useEditableColumnSwitch = (
  props: WTableEditableColumnHookProps
) => {
  const switchLoading = ref(false)

  const switchLoadStart = () => (switchLoading.value = true)
  const switchLoadEnd = () => (switchLoading.value = false)

  const isSwitchType = props.item?.editType === 'switch'

  if (isSwitchType) {
    if (
      !isFunction(
        (props.item as WTableEditableColumnSwitch)?.editTypeComponentProps
          ?.beforeChange
      )
    ) {
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
