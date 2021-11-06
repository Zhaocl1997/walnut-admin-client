<script lang="tsx">
  import type { MenuOption } from 'naive-ui'

  import { formatTree } from 'easy-fns-ts'

  export default defineComponent({
    setup() {
      const { app, menu, settings } = useAppState()
      const menuSettings = settings.value.ForDevelopers.menu
      const { t } = useAppI18n()
      const { currentRoute } = useAppRouter()

      const expandedKeys = ref()

      const getMenu = computed(() =>
        formatTree<AppMenu>(menu.value.menus, {
          format: (node) =>
            ({
              key: node.name,
              label: t(node.title),
              icon: () => <w-icon icon={node.icon}></w-icon>,
              meta: {
                type: node.type,
                ternal: node.ternal,
                url: node.url,
              },
              // extra: () => (node.badge && <n-badge value="hot"></n-badge>)
            } as MenuOption),
        })
      )

      const getExpandedKeys = computed(
        () => currentRoute.value.matched?.map((i) => i.name).splice(1) ?? []
      )

      watch(
        () => currentRoute.value.fullPath,
        () => {
          expandedKeys.value = undefined
        }
      )

      const onUpdateValue = (key: string, item: MenuOption) => {
        // If isMobile and showAside true, set showAside to false to close drawer
        if (app.value.isMobile && app.value.showAside) {
          app.value.showAside = false
        }

        if ((item.meta as AppMenu).type === 'catalog') {
          useAppMessage().info('Catalog Menu has no page!')
          return
        }

        if ((item.meta as AppMenu).ternal === 'external') {
          window.open((item.meta as AppMenu).url, '_blank')
          return
        }

        useRouterPush({ name: key })
      }

      const onUpdateExpandedKeys = (keys: string[]) => {
        expandedKeys.value = keys
      }

      return () => (
        <w-scrollbar height="100%">
          <n-menu
            collapsedWidth={menuSettings.collapsedWidth}
            accordion={menuSettings.accordion}
            collapsedIconSize={menuSettings.collapsedIconSize}
            iconSize={menuSettings.iconSize}
            indent={menuSettings.indent}
            options={getMenu.value}
            collapsed={app.value.collapse}
            value={currentRoute.value.name}
            on-update:value={onUpdateValue}
            expanded-keys={expandedKeys.value ?? getExpandedKeys.value}
            on-update:expanded-keys={onUpdateExpandedKeys}
          ></n-menu>
        </w-scrollbar>
      )
    },
  })
</script>
