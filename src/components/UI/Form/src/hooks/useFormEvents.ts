import type { WForm } from '../types'
import { useEvents } from '@/hooks/component/useEvent'

export const useFormEvents = (props: ComputedRef<WForm.Props>) =>
  useEvents<WForm.Params.Entry>(props)
