<script lang="tsx">
  import type { MenuOption } from 'naive-ui'

  import { findPath, formatTree } from 'easy-fns-ts'
  import { cloneDeep } from 'lodash-es'

  export default defineComponent({
    setup() {
      const appMenu = useAppStoreMenu()
      const appAdapter = useAppStoreAdapter()
      const appSetting = useAppStoreSetting()

      const { t } = useAppI18n()
      const { currentRoute } = useAppRouter()

      const expandedKeys = ref<string[]>()

      const getTransformName = computed(() =>
        currentRoute.value.meta.menuActiveName
          ? currentRoute.value.meta.menuActiveName
          : currentRoute.value.name
      )

      // below, clone to not affect original menu data, then filter the `show` field deeply
      // finally format to naive-ui menu option data structure
      const getMenu = computed(() =>
        formatTree<AppSystemMenu, MenuOption>(
          filterTree<AppSystemMenu, Omit<AppSystemMenu, 'show'>>(
            cloneDeep(appMenu.menus),
            (node) => node.show!
          ),
          {
            format: (node) => ({
              key: node.name,
              label: t(node.title!),
              icon: () => <w-icon icon={node.icon}></w-icon>,
              meta: {
                type: node.type,
                ternal: node.ternal,
                url: node.url,
              },
              // extra: () => (node.badge && <n-badge value="hot"></n-badge>)
            }),
          }
        )
      )

      watchEffect(() => {
        // TODO 999
        const paths = findPath(
          toRaw(appMenu.menus),
          (n) => n.name === getTransformName.value
        ) as AppSystemMenu[]

        if (paths) {
          expandedKeys.value = paths.map((i) => i.name!)
        }
      })

      const onUpdateValue = (key: string, item: MenuOption) => {
        // If isMobile and showAside true, set showAside to false to close drawer
        if (appAdapter.isMobile && appMenu.showAside) {
          appMenu.showAside = false
        }

        if ((item.meta as AppSystemMenu).type === AppConstMenuType.CATALOG) {
          useAppMessage().info('Catalog Menu has no page!')
          return
        }

        if (
          (item.meta as AppSystemMenu).ternal === AppConstMenuTernal.EXTERNAL
        ) {
          openExternalLink((item.meta as AppSystemMenu).url!)
          return
        }

        useAppRouterPush({ name: key })
      }

      const onUpdateExpandedKeys = (keys: string[]) => {
        expandedKeys.value = keys
      }

      return () => (
        <w-scrollbar height="100%">
          <n-menu
            id="walnut-sider"
            mode={
              appSetting.settings.app.layout === AppConstLayoutMode.LEFT_MENU
                ? 'vertical'
                : 'horizontal'
            }
            inverted={appSetting.settings.menu.inverted}
            collapsedWidth={appSetting.settings.menu.collapsedWidth}
            accordion={appSetting.settings.menu.accordion}
            collapsedIconSize={appSetting.settings.menu.collapsedIconSize}
            iconSize={appSetting.settings.menu.iconSize}
            indent={appSetting.settings.menu.indent}
            options={getMenu.value}
            collapsed={appMenu.collapse}
            value={getTransformName.value}
            on-update:value={onUpdateValue}
            expanded-keys={expandedKeys.value}
            on-update:expanded-keys={onUpdateExpandedKeys}
          ></n-menu>
        </w-scrollbar>
      )
    },
  })
</script>
