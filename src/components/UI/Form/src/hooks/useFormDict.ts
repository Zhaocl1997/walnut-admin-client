import type { WForm } from '../types'

export const useFormDict = (schemas: Ref<WForm.Schema.Item<any>[]>) => {
  ;(async () => {
    // cached for dict form item
    await Promise.all(
      schemas.value.map((i) => {
        if (i.type === 'Extend:Dict') {
          return useDict(i.componentProp?.dictType!)
        }
      })
    )
  })()
}
