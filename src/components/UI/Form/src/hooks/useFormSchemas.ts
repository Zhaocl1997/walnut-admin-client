import type { ComputedRef } from 'vue'
import type { WFormProps, WFormSchemaItem } from './../types'
import { ref, unref, watch } from 'vue'

export const useFormSchemas = (props: ComputedRef<WFormProps>) => {
  const formSchemas = ref<WFormSchemaItem[]>([])

  watch(
    () => unref(props).schemas,
    (val: WFormSchemaItem[]) => {
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
