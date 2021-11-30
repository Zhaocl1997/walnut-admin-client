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
    for (const [k, _] of Object.entries(stateRef.value)) {
      stateRef.value[k] = getInitialState()[k] ?? null
    }
  }

  return {
    stateRef,
    setState,
    resetState,
  }
}
