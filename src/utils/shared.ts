import type { Slots } from 'vue'
import { renderSlot } from 'vue'
import { filter, isEmpty, isUndefined } from 'lodash-es'

export const getDefaultSlotText = (slots: Slots): string => {
  const str = (slots.default && slots.default()[0].children) as string

  if (str) return str.trimStart().trimEnd()

  return ''
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

// filter tree deeply
export const filterTree = <T, R = T>(
  tree: TreeNodeItem<T>[],
  cb: (node: T) => boolean
): TreeNodeItem<R>[] =>
  // @ts-ignore
  filter(tree, (item) => {
    if (cb(item)) {
      if (item.children) {
        // @ts-ignore
        item.children = filterTree(item.children, cb)
      }
      return true
    } else if (item.children) {
      // @ts-ignore
      item.children = filterTree(item.children, cb)
      return !isEmpty(item.children)
    }
  })
