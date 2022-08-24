import type { WForm } from '../types'

export const useFormEvents = (props: ComputedRef<WForm.Props>) =>
  useEvents<WForm.Params.Entry>(props)
