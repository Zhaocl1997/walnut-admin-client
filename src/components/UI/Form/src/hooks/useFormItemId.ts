import { WForm } from '../types'
import { generateFormItemId } from '../utils'

export const formIdMap = ref(new Map())

export const setFormItemId = (
  item: WForm.Schema.Item,
  index: number,
  value: boolean
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
