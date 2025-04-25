import type { WForm } from '../types'
import { isUndefined } from 'lodash-es'

import { formItemUtils } from '../utils'
import { formIdMap, getFormItemId, setFormItemId } from './useFormItemId'

export function useFormSchemas(props: ComputedRef<WForm.Props>) {
  const formSchemas = ref<WForm.Schema.Item<any>[]>()

  watch(
    () => [props.value.schemas, props.value.model, formIdMap] as const,
    ([s]) => {
      formSchemas.value = s
        ?.map((i, idx) => {
          if (isUndefined(getFormItemId(i, idx)))
            setFormItemId(i, idx, true)

          return {
            ...i,
            _internalShow: getFormItemId(i, idx),
          }
        })
        .filter(
          i =>
            formItemUtils.getIfOrShowBooleanValue(i, props.value, 'vIf')
            && formItemUtils.getIfOrShowBooleanValue(i, props.value, 'vShow'),
        )
    },
    {
      deep: true,
      immediate: true,
    },
  )

  return { formSchemas }
}
