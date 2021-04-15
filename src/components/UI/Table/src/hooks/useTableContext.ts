import { unref } from 'vue'
import { tableKey } from '../utils/InjectionKey'
import { useContext } from '../../../../../hooks/core/useContext'

export const useTableContext = () => {
  const { setContext, getContext } = useContext()

  const setTableContext = (value: any) => {
    setContext(tableKey, value)
  }

  const getTableContext = () => {
    const formContext: any = getContext(tableKey)
    return { ...unref(formContext) }
  }

  return {
    setTableContext,
    getTableContext,
  }
}
