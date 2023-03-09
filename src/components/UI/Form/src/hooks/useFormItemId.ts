import type { WForm } from '../types'
import { generateFormItemId } from '../utils'

// This form id stuff is used to fix when form is update
// The collpase status of the form item would lost
// So I used a map-ref to store the collapse state
// This is totally different from the v-if/v-show control, this is more like the internal collpase state
export const formIdMap = ref(new Map())

export const setFormItemId = (
  item: WForm.Schema.Item,
  index: number,
  value: boolean,
) => {
  const id = generateFormItemId(item, index)

  formIdMap.value.set(id, value)
}

export const getFormItemId = (item: WForm.Schema.Item, index: number) => {
  const id = generateFormItemId(item, index)

  return formIdMap.value.get(id)
}

export const toggleFormItemId = (item: WForm.Schema.Item, index: number) => {
  const id = generateFormItemId(item, index)

  formIdMap.value.set(id, !formIdMap.value.get(id))
}
