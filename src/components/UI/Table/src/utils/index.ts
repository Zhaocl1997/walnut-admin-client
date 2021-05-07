import type { InjectionKey } from 'vue'

import { SymbolKeyEnum } from '/@/enums/symbol'
import { appWarning } from '/@/utils/log'

export const tableKey: InjectionKey<string | symbol> = Symbol(
  SymbolKeyEnum.TABLE_KEY
)

export const wTableWarning = (msg: string) => {
  appWarning(SymbolKeyEnum.TABLE_KEY.toLocaleUpperCase(), msg)
}
