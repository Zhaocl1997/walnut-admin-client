<script lang="tsx">
  import type { PropType } from 'vue'
  import type { Menu } from '/@/router/types'
  import type { MenuOption } from 'naive-ui'

  import { defineComponent, computed } from 'vue'
  import { findPath, formatTree } from 'easy-fns-ts'

  import { useAppContext } from '/@/App'
  import { useAppRouter, useRouterPush } from '/@/router'
  import { useI18n } from '/@/locales'

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
      const { t } = useI18n()

      const getTranslatedMenus = computed(() =>
        formatTree(props.menus, {
          format: (node) =>
            ({
              key: node.name,
              label: t(node.title),
              icon: () => <w-icon icon={node.icon}></w-icon>,
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

        // If external, open new tab and go
        // if (item.external) {
        //   window.open(item.url, '_blank')
        // } else
        //  {
        useRouterPush({ name: key })
        // }
      }

      return () => (
        <w-scrollbar height="100%">
          <n-menu
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
