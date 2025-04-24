import { capitalize } from 'vue'

export interface useEventParams<N = string, P = any> {
  name: N
  params?: P
}

// TODO need to remove?
export function useEvents<T extends useEventParams>(props: MaybeRefSelf<any>, pool?: string[]) {
  const instance = getCurrentInstance()!

  const emit = instance.emit

  const onEvent = (val: T) => {
    if (Array.isArray(pool) && !pool?.includes(val.name)) {
      console.warn('useEvents', `Event "${val.name}" hasn't been registered to 'emits' option !`)
      return
    }

    emit(val.name, val.params)

    const propEventName = `on${capitalize(val.name)}`

    if (unref(props)[propEventName])
      unref(props)[propEventName](val.params)
  }

  return {
    onEvent,
  }
}
