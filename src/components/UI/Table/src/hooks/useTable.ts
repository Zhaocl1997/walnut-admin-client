import type { WTableProps } from '../types'

import { ref, unref, nextTick, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'
import { appError } from '/@/utils/log'

export const useTable = (props: WTableProps) => {
  isInSetup()

  const tableRef = ref<Nullable<any>>(null)

  const getInstance = async (): Promise<any> => {
    const instance: any = unref(tableRef)!
    if (!instance) {
      appError('Table instance is undefined!')
    }
    await nextTick()
    return instance
  }

  const register = (instance: any): void => {
    tableRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods: any = {}

  return [register, methods]
}
