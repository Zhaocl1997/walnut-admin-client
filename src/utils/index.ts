export const emptyFunction = () => {}

// Get Api prefix like `/api/v1/`
export const getApiPrefix = (base: string, version: number) => {
  return `/${base}/v${version}`
}

/**
 * @description normalize the state usage and manegement, only work for shallow object
 */
export const useInitialState = <T extends Recordable>(state: T) => {
  const getInitialState = () => ({ ...state })

  const stateRef = ref<T>(getInitialState())

  const setState = (newState: T) => {
    Object.assign(stateRef.value, newState)
  }

  const resetState = () => {
    for (const [k, v] of Object.entries(stateRef.value))
      stateRef.value[k] = getInitialState()[k]
  }

  return {
    stateRef,
    setState,
    resetState,
  }
}
