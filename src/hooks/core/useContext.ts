import type { InjectionKey } from 'vue'
import { inject, provide, unref } from 'vue'

/**
 * @description Integrate entry context, expose `setContext` and `getContext` two functions
 */
export const useContext = () => {
  const setContext = <T>(key: InjectionKey<string | symbol>, ctx: T): void => {
    provide<T>(key, ctx)
  }

  const getContext = <T>(key: InjectionKey<string | symbol>) => {
    return unref(inject<T>(key))
  }

  return {
    setContext,
    getContext,
  }
}
