import type { WForm } from '../types'
import type { ComputedRef } from 'vue'

import { ref, watch } from 'vue'

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
