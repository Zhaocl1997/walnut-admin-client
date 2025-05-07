import type { WTable } from '../types'

export function useTableEvents<T>(props: ComputedRef<WTable.Props<T>>) {
  return useEvents<WTable.Params.UseEvent<T>>(props)
}
