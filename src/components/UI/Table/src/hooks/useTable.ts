import type { WTableProps } from '../types'
import type { MaybeRefRecord } from '/~/utils'

import { ref, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'

export const useTable = <T>(props: MaybeRefRecord<WTableProps<T>>) => {
  isInSetup()

  const tableRef = ref<Nullable<any>>(null)

  const register = (instance: any): void => {
    tableRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: any = {}

  return [register, methods]
}
