import type { WForm } from '../types'

export async function useFormDict<T>(schemas: WForm.Schema.Item<T>[]) {
  if (schemas.some(i => i.type === 'Business:Dict')) {
    const usedDictTypes = schemas
      .filter(i => i.type === 'Business:Dict')
      .map(i => (i as WForm.Schema.SchemaItem.DictSchema<T>).componentProp?.dictType as string)
      .filter(Boolean)
    console.log('WForm Dict Init', { usedDictTypes })
    await initDict(usedDictTypes)
  }
}
