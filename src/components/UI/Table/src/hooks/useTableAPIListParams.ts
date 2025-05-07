export function useTableAPIListParams<T>() {
  const {
    stateRef: apiListParams,
    resetState: resetParams,
    commit: commitParams,
  } = useState<WalnutBaseListParams<T>>({
    query: {} as T,
    sort: [],
    page: {
      page: 1,
      pageSize: 10,
    },
  })

  return { apiListParams, resetParams, commitParams }
}

export type ICompUITableHooksAPIListParams<T> = ReturnType<typeof useTableAPIListParams<T>>
