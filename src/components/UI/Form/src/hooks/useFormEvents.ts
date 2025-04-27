import type { WForm } from '../types'

export function useFormEvents<T>(props: ComputedRef<WForm.Props<T>>) {
  return useEvents<WForm.Params.UseEvent<T>>(props)
}
