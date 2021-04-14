import type { InjectionKey } from 'vue'
import { SymbolKeyEnum } from '/@/enums/symbol'

export const tableKey: InjectionKey<string | symbol> = Symbol(
  SymbolKeyEnum.TABLE_KEY
)
