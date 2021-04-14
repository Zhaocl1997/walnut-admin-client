import type { InjectionKey } from 'vue'
import { SymbolKeyEnum } from '/@/enums/symbol'

export const tabsKey: InjectionKey<string | symbol> = Symbol(
  SymbolKeyEnum.TABS_KEY
)
