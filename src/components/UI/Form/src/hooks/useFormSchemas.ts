import type { WForm } from '../types'
import { getEPBooleanValue } from '../utils'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item<any>[]>([])

  watch(
    () => props.value.schemas,
    (val) => {
      // @ts-ignore
      formSchemas.value = val
        ?.map((i) => ({ ...i, foldShow: true }))
        .filter(
          (i) =>
            getEPBooleanValue(i, props.value, 'vIf') &&
            getEPBooleanValue(i, props.value, 'vShow')
        )
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    formSchemas,
  }
}
