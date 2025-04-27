import type { WForm } from '../types'
import type { ICompUIFormHooksItemId } from './useFormItemId'

import { isUndefined } from 'lodash-es'

export function useFormSchemas<T>(props: ComputedRef<WForm.Props<T>>, formItemIdCtx: ICompUIFormHooksItemId) {
  const formSchemas = ref<WForm.Schema.Item<T>[]>([])

  const { formIdMap, getFormItemId, setFormItemId } = formItemIdCtx

  watchDebounced(
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
    },
    {
      deep: true,
      immediate: true,
      debounce: 200,
    },
  )

  return { formSchemas }
}
