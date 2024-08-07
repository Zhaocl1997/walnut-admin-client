import type { WForm } from '../types'

export function useFormEvents(props: ComputedRef<WForm.Props>) {
  return useEvents<WForm.Params.Entry>(props)
}
