import type { WForm } from '../types'

export const { setContext: setFormContext, getContext: useFormContext }
  = useContext<WForm.Context<any>>(Symbol(AppConstSymbolKey.FORM_KEY))
