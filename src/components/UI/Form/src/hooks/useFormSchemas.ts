import type { WForm } from '../types'
import type { ICompUIFormHooksItemId } from './useFormItemId'
import { isUndefined } from 'lodash-es'

import { useFormDict } from './useFormDict'

export function useFormSchemas<T>(props: ComputedRef<WForm.Props<T>>, formItemIdCtx: ICompUIFormHooksItemId<T>) {
  const formSchemas = ref<WForm.Schema.Item<T>[]>([])

  const { formIdMap, getFormItemId, setFormItemId } = formItemIdCtx

  watch(
    () => formIdMap.value,
    () => {
      // do something here
      console.log('WForm: formIdMap CHANGED')
    },
    { immediate: true, deep: true },
  )

  watch(
    () => props.value.model,
    () => {
      // do something here
      console.log('WForm: model CHANGED')
    },
    { immediate: true, deep: true },
  )

  watchThrottled(
    () => props.value.schemas,
    (v) => {
      if (!v)
        return

      formSchemas.value = v.map((i, idx) => {
        if (isUndefined(getFormItemId(i, idx)))
          setFormItemId(i, idx, true)

        return {
          ...i,
          _internalShow: getFormItemId(i, idx),
        }
      })

      useFormDict<T>(formSchemas.value)
    },
    {
      deep: true,
      immediate: true,
      throttle: 200,
    },
  )

  return formSchemas
}
