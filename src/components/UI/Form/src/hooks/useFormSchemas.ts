import type { WForm } from '../types'
import type { ComputedRef } from 'vue'

import { ref, watchEffect } from 'vue'
import { formatTree, genUUID, isArray } from 'easy-fns-ts'

export const useFormSchemas = (
  props: WForm.Props,
  getProps: ComputedRef<WForm.Props>
) => {
  const formSchemas = ref<WForm.Schema.Item[]>([])

  watchEffect(() => {
    const formatted = formatTree(
      props.schemas ?? (getProps.value.schemas as any),
      {
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
      }
    )

    formSchemas.value = formatted

    console.log('w-form rendered')
  })

  // watch(
  //   () => props.value.schemas,
  //   (val) => {
  //     console.log(999)

  //     // @ts-ignore
  //     formSchemas.value = formatTree(val, {
  //       format: (node) => {
  //         if (isArray(node.componentProp?.children)) {
  //           for (let i = 0; i < node.componentProp?.children.length; i++) {
  //             node.componentProp.children[i].uid = genUUID()
  //           }
  //         }

  //         return {
  //           ...node,
  //           uid: genUUID(),
  //         }
  //       },
  //     })
  //   },
  //   {
  //     deep: true,
  //     immediate: true,
  //   }
  // )

  return {
    formSchemas,
  }
}
