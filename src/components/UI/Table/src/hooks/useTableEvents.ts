import type { WTable } from '../types'

export const useTableEvents = (props: ComputedRef<WTable.Props>) =>
  useEvents<WTable.Emit.Entry>(props, ['hook', 'tableHeaderActions'])
