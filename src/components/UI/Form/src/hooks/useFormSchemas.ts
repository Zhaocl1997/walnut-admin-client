import type { WForm } from '../types'
import type { ComputedRef } from 'vue'
import { ref, unref, watch } from 'vue'
import { formatTree, genUUID, isArray } from 'easy-fns-ts'

export const useFormSchemas = (props: ComputedRef<WForm.Props>) => {
  const formSchemas = ref<WForm.Schema.Item[]>([])

  watch(
    () => unref(props).schemas,
    (val) => {
      // @ts-ignore
      formSchemas.value = formatTree(val, {
        format: (node) => {
          if (isArray(node.componentProp?.children)) {
            for (let i = 0; i < node.componentProp?.children.length; i++) {
              node.componentProp.children[i].uid = genUUID()
            }
          }

          return {
            ...node,
            uid: genUUID(),
          }
        },
      })
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
