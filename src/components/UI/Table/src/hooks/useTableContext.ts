import type { WTable } from '../types'

export const { setContext: setTableContext, getContext: useTableContext } =
  useContext<WTable.Context>(Symbol(AppConstSymbolKey.TABLE_KEY))
