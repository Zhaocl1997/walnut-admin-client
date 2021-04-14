import type { InjectionKey } from 'vue'
import { SymbolKeyEnum } from '/@/enums/symbol'

export const formKey: InjectionKey<string | symbol> = Symbol(
  SymbolKeyEnum.FORM_KEY
)
