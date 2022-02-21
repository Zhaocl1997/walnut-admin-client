import type { Slots } from 'vue'
import { renderSlot } from 'vue'

export const getDefaultSlotText = (slots: Slots): string => {
  return ((slots.default && slots.default()[0].children) as string) || ''
}

export const isInSetup = () => {
  if (!getCurrentInstance()) {
    AppBrowserError('Hook can only be used in `setup` function!')
  }
}

export const renderSlots = <T extends AnyObject>(slots: Slots) => {
  const ret = {}
  Object.keys(slots).map((slotName) => {
    ret[slotName] = (scope: T) => renderSlot(slots, slotName, scope)
  })
  return ret
}

export const FilterObjectFalsyValueDeep = (object: Recordable) => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') FilterObjectFalsyValueDeep(v)
    if (
      (v && typeof v === 'object' && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v.length === 0
    ) {
      if (Array.isArray(object)) object.splice(k as unknown as number, 1)
      else if (!(v instanceof Date)) delete object[k]
    }
  })
  return object
}
