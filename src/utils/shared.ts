import type { Slots } from 'vue'
import { renderSlot } from 'vue'
import { isUndefined } from 'easy-fns-ts'

export const getDefaultSlotText = (slots: Slots): string => {
  return ((slots.default && slots.default()[0].children) as string) || ''
}

export const isInSetup = () => {
  if (!getCurrentInstance()) {
    AppError('Hook can only be used in `setup` function!')
  }
}

export const renderSlots = <T extends Recordable>(slots: Slots) => {
  const ret = {}
  Object.keys(slots).map((slotName) => {
    ret[slotName] = (scope: T) => renderSlot(slots, slotName, scope)
  })
  return ret
}

// handle undefined to defaultValue
export const getBoolean = (val: any, df = true) => (isUndefined(val) ? df : val)
