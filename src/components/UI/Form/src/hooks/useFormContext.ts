import type { WForm } from '../types'

export const { setContext: setFormContext, getContext: useFormContext } =
  useContext<WForm.Context>(Symbol(SymbolKeyConst.FORM_KEY))
