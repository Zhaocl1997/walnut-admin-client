import type { WForm } from '../types'
import { getEPBooleanValue } from '../utils'
import { getBoolean } from '/@/utils/shared'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item<any>[]>([])

  watch(
    () => [props.value.schemas, props.value.model],
    ([s, m]) => {
      // @ts-ignore
      formSchemas.value = toRaw(s)
        // @ts-ignore
        ?.map((i) => ({ ...i, _internalShow: getBoolean(i._internalShow) }))
        .filter(
          // @ts-ignore
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
