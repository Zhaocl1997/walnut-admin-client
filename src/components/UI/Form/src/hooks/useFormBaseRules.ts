import type { WForm } from '../types'
import { generateBaseRules } from '../utils'

export function useFormBaseRules(props: ComputedRef<WForm.Props<any>>, schemas: Ref<WForm.Schema.Item<any>[]>) {
  return computed(() =>
    props.value.baseRules
      ? generateBaseRules(schemas.value, props)
      : props.value.rules,
  )
}
