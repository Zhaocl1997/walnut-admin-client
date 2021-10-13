import type { WTable } from '../types'

import { ref, watchEffect } from 'vue'
import { isInSetup } from '/@/utils/shared'

export const useTable = (props: WTable.Props) => {
  isInSetup()

  const wTableRef = ref(null)

  const register = (instance: WTable.Ref.WFormInst) => {
    wTableRef.value = instance

    watchEffect(() => {
      props && instance.setProps(props)
    })
  }

  const methods = {}

  return [register, methods]
}
