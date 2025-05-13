import type { WForm } from '../types'

export function useFormDict<T>(schemas: WForm.Schema.Item<T>[]) {
  if (schemas.some(i => i.type === 'Business:Dict')) {
    const dictTypes = schemas
      .filter(i => i.type === 'Business:Dict')
      .map(i => (i as WForm.Schema.SchemaItem.DictSchema<T>).componentProp?.dictType)

    initDict(dictTypes)
  }
}
