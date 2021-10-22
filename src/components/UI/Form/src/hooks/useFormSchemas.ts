import type { WForm } from '../types'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item<any>[]>([])

  watch(
    () => props.value.schemas,
    (val) => {
      // @ts-ignore
      formSchemas.value = val?.map((i) => ({ ...i, foldShow: true }))
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
