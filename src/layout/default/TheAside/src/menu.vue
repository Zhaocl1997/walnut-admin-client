<script lang="tsx">
  import type { PropType } from 'vue'
  import type { Menu } from '/@/router/types'
  import type { MenuOption } from 'naive-ui'

  import { findPath, formatTree } from 'easy-fns-ts'

  export default defineComponent({
    name: 'AsideMenu',

    props: {
      menus: {
        type: Array as PropType<Menu[]>,
        required: true,
      },
    },

    setup(props) {
      const router = useAppRouter()
      const { app } = useAppContext()
      const { t } = useAppI18n()

      const getTranslatedMenus = computed(() =>
        formatTree<Menu>(props.menus, {
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

      const defaultExpandedKeys = computed(() => {
        const paths = findPath(
          props.menus,
          (node) => node.name === router.currentRoute.value.name,
          { id: '_id' }
        ) as Menu[]

        if (!paths) {
          return []
        }

        paths.pop()

        return paths.map((i) => i.name)
      })

      const onChange = (key: string, item: MenuOption) => {
        // If isMobile and showAside true, set showAside to false to close drawer
        if (app.value.isMobile && app.value.showAside) {
          app.value.showAside = false
        }

        if ((item.meta as Menu).type === 'catalog') {
          useAppMessage().info('Catalog Menu has no page!')
          return
        }

        if ((item.meta as Menu).ternal === 'external') {
          window.open((item.meta as Menu).url, '_blank')
          return
        }

        useRouterPush({ name: key })
      }

      return () => (
        <w-scrollbar height="100%">
          <n-menu
            accordion
            indent={15}
            options={getTranslatedMenus.value}
            collapsed={app.value.collapse}
            value={router.currentRoute.value.name}
            on-update:value={onChange}
            default-expanded-keys={defaultExpandedKeys.value}
          ></n-menu>
        </w-scrollbar>
      )
    },
  })
</script>
