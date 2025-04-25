import type { WForm } from '../types'

export function useFormDict<T>(schemas: Ref<WForm.Schema.Item<T>[]>) {
  // (async () => {
  //   // cached for dict form item
  //   // TODO optimise
  //   await Promise.all(
  //     schemas.value.map((i) => {
  //       if (i.type === 'Business:Dict')
  //         return initDict(i.componentProp!.dictType!)
  //       return undefined
  //     }).filter(Boolean),
  //   )
  // })()
  if (schemas.value.some(i => i.type === 'Business:Dict')) {
    initDict(schemas.value.filter(i => i.type === 'Business:Dict').map(i => (i as WForm.Schema.SchemaItem.DictSchema<T>).componentProp?.dictType!))
  }
}
