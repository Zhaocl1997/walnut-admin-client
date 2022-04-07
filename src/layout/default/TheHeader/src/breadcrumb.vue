<script lang="tsx">
  import { findPath } from 'easy-fns-ts'
  import { DropdownOption, darkTheme } from 'naive-ui'

  export default defineComponent({
    setup() {
      const { settings, menu, app } = useAppState()
      const breadcrumb = settings.value.ForDevelopers.breadcrumb
      const { t } = useAppI18n()
      const { currentRoute } = useAppRouter()

      const getChildren = computed(() => {
        // TODO 999
        const matched = findPath(
          toRaw(menu.value.menus),
          (n) =>
            n.name ===
            (currentRoute.value.meta.menuActiveName
              ? currentRoute.value.meta.menuActiveName
              : currentRoute.value.name)
        ) as AppSystemMenu[]

        // handle menuActiveName
        if (currentRoute.value.meta.menuActiveName) {
          matched.push({
            name: currentRoute.value.name as string,
            path: currentRoute.value.path,
            ...currentRoute.value.meta,
          })
        }

        if (matched) {
          return matched.filter((item) => item.title)
        }
      })

      const renderBase = (item: AppSystemMenu) => (
        <div class="inline">
          {breadcrumb.showIcon && (
            <w-icon icon={item.icon} height="20" class="mr-1 -mb-1"></w-icon>
          )}
          <span class="">{t(item.title!)}</span>
        </div>
      )

      const genOptions = (
        arr?: TreeNodeItem<AppSystemMenu>[]
      ): DropdownOption[] | undefined => {
        if (!arr || arr?.length === 0) {
          return undefined
        } else {
          return arr?.map(
            (i) =>
              ({
                key: i.name,
                label: t(i?.title!),
                icon: breadcrumb.showIcon
                  ? () => <w-icon icon={i?.icon} height="20"></w-icon>
                  : null,
                children: genOptions(i.children),
              } as DropdownOption)
          )
        }
      }

      const renderDropdown = (item: TreeNodeItem<AppSystemMenu>) => (
        <n-dropdown
          onSelect={(key: string) => {
            useRouterPush({ name: key })
          }}
          show-arrow
          options={genOptions(item.children)}
        >
          {renderBase(item)}
        </n-dropdown>
      )

      return () => (
        <n-config-provider
          theme={
            (!app.value.isDark &&
              settings.value.ForDevelopers.header.inverted) ||
            app.value.isDark
              ? darkTheme
              : null
          }
        >
          <n-breadcrumb separator={breadcrumb.separator}>
            {getChildren.value!.map((item) => (
              <n-breadcrumb-item>
                {breadcrumb.showDropdown
                  ? renderDropdown(item)
                  : renderBase(item)}
              </n-breadcrumb-item>
            ))}
          </n-breadcrumb>
        </n-config-provider>
      )
    },
  })
</script>
