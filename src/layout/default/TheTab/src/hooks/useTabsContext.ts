import { unref } from 'vue'
import { tabsKey } from '../utils/InjectionKey'
import { useContext } from '../../../../../hooks/core/useContext'

export const useTabsContext = () => {
  const { setContext, getContext } = useContext()

  const setTabsContext = (value: any) => {
    setContext(tabsKey, value)
  }

  const getTabsContext = () => {
    const formContext: any = getContext(tabsKey)
    return { ...unref(formContext) }
  }

  return {
    setTabsContext,
    getTabsContext,
  }
}
