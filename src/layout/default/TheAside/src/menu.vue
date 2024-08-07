<script lang="tsx">
import type { MenuOption } from 'naive-ui'
import { findPath, formatTree } from 'easy-fns-ts'
import { omit } from 'lodash-es'

interface MenuMeta {
  type: ValueOfAppConstMenuType
  ternal: ValueOfAppConstMenuTernal
  url: string
}

export default defineComponent({
  setup() {
    const appMenu = useAppStoreMenu()
    const appTab = useAppStoreTab()
    const appAdapter = useAppStoreAdapter()
    const appSetting = useAppStoreSetting()

    const { t } = useAppI18n()
    const { currentRoute } = useAppRouter()

    const expandedKeys = ref<string[]>()

    const getMenuValue = computed(() =>
      currentRoute.value.meta.menuActiveName
        ? currentRoute.value.meta.menuActiveName
        : currentRoute.value.name,
    )

    // format to naive-ui menu option data structure
    const getMenuOptions = computed(() =>
      formatTree<AppSystemMenu, MenuOption>(toRaw(appMenu.menus), {
        format: node => ({
          key: node.name,
          label: t(node.title!),
          icon: () => {
            if (
              (node.type === AppConstMenuType.CATALOG
              && expandedKeys.value?.includes(node.name!))
              || node.name === getMenuValue.value
            ) {
              return (
                <w-icon
                  icon={node.activeIcon ? node.activeIcon : node.icon}
                >
                </w-icon>
              )
            }

            return <w-icon icon={node.icon}></w-icon>
          },
          meta: {
            type: node.type,
            ternal: node.ternal,
            url: node.url,
          } as MenuMeta,
          show: node.show,
          extra: () =>
            node.badge && <n-badge size="small" value={node.badge}></n-badge>,
        }),
      }),
    )

    // handle expanded-keys logic
    watch(
      () => getMenuValue.value,
      (v) => {
        const paths = findPath<AppSystemMenu>(
          toRaw(appMenu.menus),
          n => n.name === v,
        )

        if (paths)
          expandedKeys.value = (paths as AppSystemMenu[]).map(i => i.name!)
      },
      {
        immediate: true,
      },
    )

    const onUpdateValue = async (key: string, item: { meta: MenuMeta }) => {
      // If isMobile and showAside true, set showAside to false to close drawer
      if (appAdapter.isMobile && appMenu.showAside)
        appMenu.showAside = false

      // normal won't trigger the if below if the routers are configed correctly
      // only trigger when one catelog menu has no children menus
      if (item.meta.type === AppConstMenuType.CATALOG) {
        useAppMessage().info('Catalog Menu has no page!')
        return
      }

      // open external link, safely
      if (item.meta.ternal === AppConstMenuTernal.EXTERNAL) {
        openExternalLink(item.meta.url!, true)
        return
      }

      // omit the query field when click the side menu
      // should do so, otherwise once the route has query, user cannot get rid of it
      const targetTab = appTab.tabs.find(i => i.name === key)
      if (targetTab)
        appTab.setTabByName(key, omit(targetTab, 'query'), 'splice')

      await useAppRouterPush({ name: key })
    }

    return () => (
      <w-transition appear name={appSetting.getMenuTransition}>
        {appSetting.getMenuShow && (
          <w-scrollbar
            height="100%"
            class={[
              'transition-all',
              {
                'pb-6': appSetting.getMenuCollapseButtonStatus,
                'absolute': appSetting.getLogoFixed,
              },
            ]}
            style={{
              paddingTop:
                  `${appSetting.getLogoShow && appSetting.getLogoFixed
                    ? appSetting.header.height
                    : 0}px`,
            }}
          >
            <n-menu
              id={appSetting.getMenuId}
              v-model:expanded-keys={expandedKeys.value}
              inverted={appSetting.menu.inverted}
              collapsedWidth={appSetting.menu.collapsedWidth}
              accordion={appSetting.menu.accordion}
              collapsedIconSize={appSetting.menu.collapsedIconSize}
              iconSize={appSetting.menu.iconSize}
              indent={appSetting.menu.indent}
              options={getMenuOptions.value}
              collapsed={appMenu.collapse}
              value={getMenuValue.value}
              on-update:value={onUpdateValue}
            >
            </n-menu>
          </w-scrollbar>
        )}
      </w-transition>
    )
  },
})
</script>
