import type { WForm } from '../types'
import { getFormBooleanField } from '../utils'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item<any>[]>([])

  watch(
    () => [props.value.schemas, props.value.model],
    ([s, m]) => {
      // TODO form/table _internalShow redesign
      formSchemas.value = s
        ?.map((i) => ({
          ...i,
          _internalShow: getBoolean(i._internalShow),
        }))
        .filter(
          // @ts-ignore
          (i) =>
            getFormBooleanField(i, props.value, 'vIf') &&
            getFormBooleanField(i, props.value, 'vShow')
        )
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return { formSchemas }
}
