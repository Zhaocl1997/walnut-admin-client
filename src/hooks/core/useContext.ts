import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

/**
 * @description Integrate entry context, expose `setContext` and `getContext` two functions
 */
export const useContext = <T>() => {
  const setContext = (key: InjectionKey<string | symbol>, ctx: T): void => {
    provide<T>(key, ctx)
  }

  const getContext = (key: InjectionKey<string | symbol>): T => {
    return inject<T>(key)!
  }

  return {
    setContext,
    getContext,
  }
}
