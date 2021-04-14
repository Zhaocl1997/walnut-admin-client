import type { Collection } from '@iconify/json-tools'

/**
 * @description Generate icon list based on used collections
 */
export const genIconLists = (collections: Collection[]) => {
  const ret: string[] = []
  collections.forEach((item) => {
    ret.push(...Object.keys(item.icons).map((key) => `${item.prefix}:${key}`))
  })
  return ret
}
