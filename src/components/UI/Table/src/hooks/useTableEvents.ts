import type { ComputedRef } from 'vue'
import type { WTable } from '../types'

import { getCurrentInstance, capitalize } from 'vue'

export const useTableEvents = (props: ComputedRef<WTable.Props>, emit: Fn) => {
  const instance = getCurrentInstance()

  const events = Object.keys((instance as any).emitsOptions)

  const tableEvent = (val: WTable.Params.Entry) => {
    emit(val.eventName, val.eventParams)

    const propEventName = `on${capitalize(val.eventName)}`

    if (props.value[propEventName]) {
      props.value[propEventName](val.eventParams)
    }
  }

  return {
    tableEvent,
  }
}
