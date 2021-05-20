import type { ElInputRef } from '/@/components/UI/Input'
import type { WTable } from '/@/components/UI/Table'

import { ref, computed } from 'vue'

export const useEditableState = (
  props: SetupProp<{
    item: WTable.Header.Item.Editable
    row: Pick<WTable.ElTable.SlotData, 'row'>
  }>
) => {
  const editable = ref(false)
  const editValue = ref('')
  const editableComponentRef = ref<Nullable<ElInputRef>>(null)

  // get column props
  const getColumnProps = computed(() => props.item?.columnProps)
  // get table column prop
  const getProp = computed(() => getColumnProps.value?.prop)

  // get component type
  // if no `editType` provided, default is input
  const getComponentType = computed(
    () => props.item?.componentProps?.editType ?? 'input'
  )
  // get component props
  const getComponentProps = computed(
    () => props.item?.componentProps?.editTypeComponentProps
  )

  return {
    editable,
    editValue,
    editableComponentRef,
    getColumnProps,
    getProp,
    getComponentType,
    getComponentProps,
  }
}
