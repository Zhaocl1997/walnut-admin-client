import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export const useContext = () => {
  const setContext = (key: InjectionKey<string | symbol>, ctx: any) => {
    provide(key, ctx)
  }

  const getContext = (key: InjectionKey<string | symbol>) => {
    return inject(key)
  }

  return {
    setContext,
    getContext,
  }
}
