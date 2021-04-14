import type { ComputedRef } from 'vue'
import { ref, unref, watch } from 'vue'
import { WFormProps, WFormSchemaItem } from './../types'

export const useFormSchemas = (props: ComputedRef<WFormProps>) => {
  const formSchemas = ref([])

  const onItemVisible = (item: WFormSchemaItem) => {
    return (
      (item.visible === undefined || item.visible === true) &&
      (item.foldVisible === undefined || item.foldVisible === true)
    )
  }

  watch(
    () => unref(props).schemas,
    (val: any) => {
      formSchemas.value = val
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    formSchemas,
    onItemVisible,
  }
}
