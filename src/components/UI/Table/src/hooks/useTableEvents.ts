import type { WTable } from '../types'

export function useTableEvents(props: ComputedRef<WTable.Props>) {
  return useEvents<WTable.Emit.Entry>(props, ['hook', 'tableHeaderActions'])
}
