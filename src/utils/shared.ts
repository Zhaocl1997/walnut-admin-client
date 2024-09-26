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
    AppConsoleErr('IsInSetup', 'Hook can only be used in `setup` function!')
}

export function renderSlots<T extends Recordable>(slots: Slots) {
  const ret: Record<string, Fn> = {}
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
        item.children = filterTree(item.children, cb)
      }
      return true
    }
    else if (item.children) {
      item.children = filterTree(item.children, cb)
      return !isEmpty(item.children)
    }
  })
}

// get country code from online free api
export function getCountryCodeOnline() {
  return fetch(EXTERNAL_LINKS.IP)
    .then(response => response.text())
    .then((response) => {
      const result = (response || '').toString()

      if (!result || result[0] !== '1')
        throw new Error('unable to fetch the country')

      return result.substr(2, 2)
    })
}
