import type { WForm } from '../types'
import { getFormBooleanField } from '../utils'
import { formIdMap, setFormItemId, getFormItemId } from './useFormItemId'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item<any>[]>()

  watch(
    () => [props.value.schemas, props.value.model, formIdMap] as const,
    ([s]) => {
      formSchemas.value = s
        ?.map((i, idx) => ({
          ...i,
          _internalShow: getFormItemId(i, idx),
        }))
        .filter(
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

  onMounted(() => {
    formSchemas.value = props.value.schemas?.map((i, idx) => {
      setFormItemId(i, idx, true)

      return {
        ...i,
        _internalShow: true,
      }
    })
  })

  return { formSchemas }
}
