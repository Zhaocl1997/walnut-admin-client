import { notFoundName, redirectName } from '/@/router/constant'

const { tab, menu } = useAppState()

const nameBlackList: string[] = [notFoundName, redirectName]

/**
 * @description Util Function 1 - Close multiple tabs
 */
const closeMultipleTabs = (lists: string[]) => {
  tab.value.tabs = tab.value.tabs.filter((i) => !lists.includes(i.name))
}

/**
 * @description Action - Tab - Delete tab
 */
export const removeTabs = (name: string, type: ValueOfDeleteTabConst) => {
  const index = tab.value.tabs.findIndex((item) => item.name === name)

  if (index === -1) return

  switch (type) {
    case DeleteTabConst.TAB_SINGLE:
      {
        // simple splice
        tab.value.tabs.splice(index, 1)

        // if close current tab, router push forward or backward
        if (tab.value.targetTab?.name === name) {
          const next = tab.value.tabs[index]
          const previous = tab.value.tabs[index - 1]

          // Got next tab, push to next. Else push to previous one
          useRouterPush({ name: next ? next.name : previous.name })
        }
      }
      break

    case DeleteTabConst.TAB_LEFT:
      {
        const nameList: string[] = []

        tab.value.tabs.map((item, i) => {
          if (i < index && !item.meta.affix) {
            nameList.push(item.name)
          }
        })

        // If left include current page, we need to push to target route
        if (nameList.includes(tab.value.currentRouteName!)) {
          useRouterPush({ name })
        }

        closeMultipleTabs(nameList)
      }
      break

    case DeleteTabConst.TAB_RIGHT:
      {
        const nameList: string[] = []

        tab.value.tabs.map((item, i) => {
          if (i > index && !item.meta.affix) {
            nameList.push(item.name)
          }
        })

        // If right include current page, we need to push to target route
        if (nameList.includes(tab.value.currentRouteName!)) {
          useRouterPush({ name })
        }

        closeMultipleTabs(nameList)
      }
      break

    case DeleteTabConst.TAB_OTHER:
      {
        const nameList: string[] = []

        tab.value.tabs.map((item) => {
          // find no affixed tabs except self
          if (item.name !== name && !item.meta.affix) {
            nameList.push(item.name)
          }
        })

        // If the closed one is not current route, we need to push to target route
        if (tab.value.currentRouteName! !== name) {
          useRouterPush({ name })
        }

        closeMultipleTabs(nameList)
      }
      break

    case DeleteTabConst.TAB_ALL:
      {
        const nameList: string[] = []

        tab.value.tabs.map((item) => {
          // find all not affixed tabs
          if (!item.meta.affix) {
            nameList.push(item.name)
          }
        })

        // Just back to index page
        useRouterPush({ name: menu.value.indexMenuName })

        closeMultipleTabs(nameList)
      }
      break

    default:
      break
  }
}

/**
 * @description Action - Tab - Clear tab
 */
export const clearTabs = () => {
  tab.value.tabs.length = 0
  tab.value.visitedTabs.clear()
}

/**
 * @description Action - Tab - Sort tab
 */
export const sortTabs = (oldIndex: number, newIndex: number) => {
  const currentTab = tab.value.tabs[oldIndex]
  tab.value.tabs.splice(oldIndex, 1)
  tab.value.tabs.splice(newIndex, 0, currentTab)
}

/**
 * @description Action - Tab - Create tab
 */
export const buildTabs = (
  paayload: AppTab,
  method: 'push' | 'unshift' = 'push'
) => {
  // redirect/404 etc pages do not need to add into tab
  if (nameBlackList.includes(paayload.name)) return

  const index = tab.value.tabs.findIndex((item) => item.name === paayload.name)

  // not found
  if (index === -1) {
    const cached = tab.value.visitedTabs.get(SymbolKeyConst.TABS_KEY)

    if (!cached || (cached && !cached.includes(paayload.name))) {
      tab.value.tabs[method](paayload)
    }
  }

  // set cached tabs
  tab.value.visitedTabs.set(
    SymbolKeyConst.TABS_KEY,
    tab.value.tabs.map((item) => item.name)
  )
}
