import type { ToRefs } from 'vue'
import type { AppContext } from '../types'

import { getCurrentInstance } from 'vue'

import { useContext } from '/@/hooks/core/useContext'
import { appKey } from '../utils/InjectionKey'
import { AppGlobalContext } from '/@/store/ctx'

const { setContext, getContext } = useContext<ToRefs<AppContext>>()

/**
 * @description Initial App Context
 */
export const setAppContext = (initialState: ToRefs<AppContext>) => {
  setContext(appKey, initialState)
}

/**
 * @description App Context Core
 *
 * Use `overload` and `generic` to return different type
 *
 * Default `generic` is `true`, which stands for usage in `setup`
 *
 * Use `useAppContext<false>()` to access app context outside `setup` function
 *
 * @link https://stackoverflow.com/questions/66003736/how-to-let-typescript-return-correct-type-based-on-parameters
 */
export function useAppContext<T extends boolean = true>(): T extends true
  ? ReturnType<typeof getContext>
  : AppContext
export function useAppContext() {
  return getCurrentInstance() ? getContext(appKey) : AppGlobalContext
}
