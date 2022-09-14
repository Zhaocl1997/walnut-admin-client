import type { WForm } from '../types'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item<any>[]>([])

  watch(
    () => [props.value.schemas, props.value.model],
    ([s, m]) => {
      // TODO form/table _internalShow redesign
      formSchemas.value = s?.map((i) => ({
        ...i,
        _internalShow: getBoolean(i._internalShow),
      }))
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return { formSchemas }
}
