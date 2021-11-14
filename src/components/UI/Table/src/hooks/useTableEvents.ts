import type { WTable } from '../types'
import { useEvents } from '/@/hooks/component/useEvent'

export const useTableEvents = (props: ComputedRef<WTable.Props>) =>
  useEvents<WTable.Params.Entry>(props)
