import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import type { StoreState } from './types'
import { SymbolKeyEnum } from '../enums/symbol'

export const storeKey: InjectionKey<Store<StoreState>> = Symbol(
  SymbolKeyEnum.STORE_KEY
)
