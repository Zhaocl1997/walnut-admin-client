import type { WForm } from '../types'
import type { ComputedRef } from 'vue'
import { ref, unref, watch } from 'vue'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item[]>([])

  watch(
    () => unref(props).schemas,
    (val) => {
      // @ts-ignore
      formSchemas.value = val
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
