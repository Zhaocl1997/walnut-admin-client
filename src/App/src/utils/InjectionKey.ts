import type { InjectionKey } from 'vue'
import { SymbolKeyEnum } from '/@/enums/symbol'

export const appKey: InjectionKey<string | symbol> = Symbol(
  SymbolKeyEnum.APP_KEY
)
