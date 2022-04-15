<script lang="tsx">
  import type { MenuOption } from 'naive-ui'

  import { findPath, formatTree } from 'easy-fns-ts'
  import { filterTree } from '/@/utils/shared'
  import { cloneDeep } from 'lodash-es'

  export default defineComponent({
    setup() {
      const { appMemo, menu, settings } = useAppState()
      const menuSettings = settings.value.ForDevelopers.menu
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
            cloneDeep(menu.value.menus),
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
          toRaw(menu.value.menus),
          (n) => n.name === getTransformName.value
        ) as AppSystemMenu[]

        if (paths) {
          expandedKeys.value = paths.map((i) => i.name!)
        }
      })

      const onUpdateValue = (key: string, item: MenuOption) => {
        // If isMobile and showAside true, set showAside to false to close drawer
        if (appMemo.value.isMobile && appMemo.value.showAside) {
          appMemo.value.showAside = false
        }

        if ((item.meta as AppSystemMenu).type === MenuTypeConst.CATALOG) {
          useAppMessage().info('Catalog Menu has no page!')
          return
        }

        if ((item.meta as AppSystemMenu).ternal === MenuTernalConst.EXTERNAL) {
          openExternalLink((item.meta as AppSystemMenu).url!)
          return
        }

        useRouterPush({ name: key })
      }

      const onUpdateExpandedKeys = (keys: string[]) => {
        expandedKeys.value = keys
      }

      return () => (
        <div class="w-full h-full">
          <n-menu
            mode={
              settings.value.ForDevelopers.app.layout ===
              AppLayoutModeConst.LEFT_MENU
                ? 'vertical'
                : 'horizontal'
            }
            inverted={menuSettings.inverted}
            collapsedWidth={menuSettings.collapsedWidth}
            accordion={menuSettings.accordion}
            collapsedIconSize={menuSettings.collapsedIconSize}
            iconSize={menuSettings.iconSize}
            indent={menuSettings.indent}
            options={getMenu.value}
            collapsed={appMemo.value.collapse}
            value={getTransformName.value}
            on-update:value={onUpdateValue}
            expanded-keys={expandedKeys.value}
            on-update:expanded-keys={onUpdateExpandedKeys}
          ></n-menu>
        </div>
      )
    },
  })
</script>
