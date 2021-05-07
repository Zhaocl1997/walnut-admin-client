import type { Slots } from 'vue'
import { getCurrentInstance, renderSlot } from 'vue'
import { appError } from './log'

export const getDefaultSlotText = (slots: Slots): string => {
  return ((slots.default && slots.default()[0].children) as string) || ''
}

export const isInSetup = () => {
  if (!getCurrentInstance()) {
    appError('Hook can only be used in `setup` function!')
  }
}

export const renderSlots = <T extends AnyObject>(slots: Slots) => {
  const ret = {}
  Object.keys(slots).map((slotName) => {
    ret[slotName] = (scope: T) => renderSlot(slots, slotName, scope)
  })
  return ret
}
