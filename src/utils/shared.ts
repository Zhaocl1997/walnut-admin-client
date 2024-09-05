import type { Slots } from 'vue'
import { renderSlot } from 'vue'
import { filter, isEmpty, isUndefined } from 'lodash-es'

export function getDefaultSlotText(slots: Slots): string {
  const str = (slots.default && slots.default()[0].children) as string

  if (str)
    return str.trimStart().trimEnd()

  return ''
}

export function isInSetup() {
  if (!getCurrentInstance())
    new AppError('Hook can only be used in `setup` function!')
}

export function renderSlots<T extends Recordable>(slots: Slots) {
  const ret = {}
  Object.keys(slots).forEach((slotName) => {
    ret[slotName] = (scope: T) => renderSlot(slots, slotName, scope)
  })
  return ret
}

// handle undefined to defaultValue
export const getBoolean = (val: any, df = true) => (isUndefined(val) ? df : val)

// get boolean or return value is boolean
export const getFunctionBoolean = <T>(val: any, cbParams: T, defaultVal = true) => (isUndefined(val) ? defaultVal : typeof val === 'boolean' ? val : val(cbParams))

// filter tree deeply
export function filterTree<T, R = T>(tree: TreeNodeItem<T>[], cb: (node: T) => boolean): TreeNodeItem<R>[] {
  return filter(tree, (item) => {
    if (cb(item)) {
      if (item.children) {
        // @ts-expect-error
        item.children = filterTree(item.children, cb)
      }
      return true
    }
    else if (item.children) {
      // @ts-expect-error
      item.children = filterTree(item.children, cb)
      return !isEmpty(item.children)
    }
  })
}
