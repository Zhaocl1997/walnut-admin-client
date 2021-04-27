import type { WFormContext } from '../types/formContext'
import { formKey } from '../utils/InjectionKey'
import { useContext } from '/@/hooks/core/useContext'

export const {
  setContext: setFormContext,
  getContext: useFormContext,
} = useContext<WFormContext>(formKey)
