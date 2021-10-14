import type { WForm } from '../types'
import { SymbolKeyEnum } from '/@/enums/symbol'

export const { setContext: setFormContext, getContext: useFormContext } =
  useContext<WForm.Context>(Symbol(SymbolKeyEnum.FORM_KEY))
