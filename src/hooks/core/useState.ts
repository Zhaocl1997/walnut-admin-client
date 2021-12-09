/**
 * @description wrapper for `useManualRefHistory` function
 * @link https://vueuse.org/core/usemanualrefhistory/#usemanualrefhistory
 */
export const useState = <T = any>(state: T) => {
  const insideState = ref<T>(state)

  const { reset, commit, history, clear } = useManualRefHistory(insideState, {
    clone: true,
  })

  return {
    stateRef: insideState,
    resetState: () => reset(),
    commit,
    history,
    clear,
  }
}
