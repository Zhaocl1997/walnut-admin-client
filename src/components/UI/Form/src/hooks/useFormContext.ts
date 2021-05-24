import type { WForm } from '../types'
import { formKey } from '../utils/InjectionKey'
import { useContext } from '/@/hooks/core/useContext'

export const {
  setContext: setFormContext,
  getContext: useFormContext,
} = useContext<WForm.Context>(formKey)
