import type { WForm } from '../types'

export function useFormDict(schemas: Ref<WForm.Schema.Item<any>[]>) {
  (async () => {
    // cached for dict form item
    // TODO optimise
    await Promise.all(
      schemas.value.map((i) => {
        if (i.type === 'Extend:Dict')
          return initDict(i.componentProp!.dictType!)
        return undefined
      }).filter(Boolean),
    )
  })()
}
