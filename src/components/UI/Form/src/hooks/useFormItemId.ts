import type { WForm } from '../types'
import { formItemUtils } from '../utils'

// This form id stuff is used to fix when form is update
// The collpase status of the form item would lost
// So I used a map-ref to store the collapse state
// This is totally different from the v-if/v-show control, this is more like the internal collpase state
export function useFormItemId() {
  const formIdMap = ref(new Map())

  function setFormItemId(item: WForm.Schema.Item, index: number, value: boolean) {
    const id = formItemUtils.generateFormItemId(item, index)

    formIdMap.value.set(id, value)
  }

  function getFormItemId(item: WForm.Schema.Item, index: number) {
    const id = formItemUtils.generateFormItemId(item, index)

    return formIdMap.value.get(id)
  }

  function hasFormItemId(item: WForm.Schema.Item, index: number) {
    const id = formItemUtils.generateFormItemId(item, index)

    return formIdMap.value.has(id)
  }

  function toggleFormItemId(item: WForm.Schema.Item, index: number) {
    const id = formItemUtils.generateFormItemId(item, index)

    formIdMap.value.set(id, !formIdMap.value.get(id))
  }

  return {
    formIdMap,
    setFormItemId,
    getFormItemId,
    hasFormItemId,
    toggleFormItemId,
  }
}

export type ICompUIFormHooksItemId = ReturnType<typeof useFormItemId>
