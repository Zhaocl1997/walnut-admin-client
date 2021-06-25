import type { WForm } from '../types'

import { ref, watch } from 'vue'

export const useFormSchemas = (props: WForm.Props) => {
  const formSchemas = ref<WForm.Schema.Item<any>[]>([])

  watch(
    () => props.schemas,
    (val) => {
      // @ts-ignore
      formSchemas.value = val!.map((i) => ({ ...i, foldShow: true, qs: true }))
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
