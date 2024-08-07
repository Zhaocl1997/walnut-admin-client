/**
 * @description wrapper for `useManualRefHistory` function
 * @link https://vueuse.org/core/usemanualrefhistory/#usemanualrefhistory
 */
export function useState<T = Recordable>(state: RecordNullable<T>) {
  const insideState = ref<RecordNullable<T>>(state)

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
