import type { MaybeRef } from '/~/utils'

import { getCurrentInstance, capitalize, unref } from 'vue'

export interface useEventParams<N = string, P = any> {
  name: N
  params?: P
}

export const useEvents = <T extends useEventParams>(
  props: MaybeRef<any>,
  pool?: string[]
) => {
  const instance = getCurrentInstance()!

  const emit = instance.emit!

  const onEvent = (val: T) => {
    emit(val.name, val.params)

    const propEventName = `on${capitalize(val.name)}`

    if (unref(props)[propEventName]) {
      unref(props)[propEventName](val.params)
    }
  }

  return {
    onEvent,
  }
}
