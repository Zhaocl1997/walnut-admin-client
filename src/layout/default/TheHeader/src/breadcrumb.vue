<script lang="tsx">
import { findPath } from 'easy-fns-ts'
import type { DropdownOption } from 'naive-ui'
import { darkTheme } from 'naive-ui'

export default defineComponent({
  setup() {
    const appMenu = useAppStoreMenu()
    const appSetting = useAppStoreSetting()
    const appDark = useAppStoreDark()

    const { t } = useAppI18n()
    const { currentRoute } = useAppRouter()

    const getChildren = computed(() => {
      // TODO 999
      const matched = findPath(
        toRaw(appMenu.menus),
        n =>
          n.name
            === (currentRoute.value.meta.menuActiveName
              ? currentRoute.value.meta.menuActiveName
              : currentRoute.value.name),
      ) as AppSystemMenu[]

      // handle menuActiveName
      if (currentRoute.value.meta.menuActiveName) {
        matched.push({
          name: currentRoute.value.name as string,
          path: currentRoute.value.path,
          ...currentRoute.value.meta,
        })
      }

      if (matched)
        return matched.filter(item => item.title)
    })

    const renderBase = (item: AppSystemMenu) => (
        <div class="inline">
          {appSetting.breadcrumb.showIcon && (
            <w-icon icon={item.icon} height="20" class="mr-1 -mb-1"></w-icon>
          )}
          <span class="">{t(item.title!)}</span>
        </div>
    )

    const genOptions = (
      arr?: TreeNodeItem<AppSystemMenu>[],
    ): DropdownOption[] | undefined => {
      if (!arr || arr?.length === 0) {
        return undefined
      }
      else {
        return arr?.map(
          i =>
            ({
              key: i.name,
              label: t(i?.title!),
              icon: appSetting.breadcrumb.showIcon
                ? () => <w-icon icon={i?.icon} height="20"></w-icon>
                : null,
              children: genOptions(i.children),
            } as DropdownOption),
        )
      }
    }

    const renderDropdown = (item: TreeNodeItem<AppSystemMenu>) => (
        <n-dropdown
          onSelect={(key: string) => {
            useAppRouterPush({ name: key })
          }}
          show-arrow
          options={genOptions(item.children)}
        >
          {renderBase(item)}
        </n-dropdown>
    )

    return () => (
        <w-transition appear name={appSetting.getBreadcrumbTransition}>
          {appSetting.getBreadcrumbShow && (
            <n-config-provider
              id={appSetting.getBreadcrumbId}
              theme={
                (!appDark.isDark && appSetting.header.inverted)
                || appDark.isDark
                  ? darkTheme
                  : null
              }
            >
              <n-breadcrumb separator={appSetting.breadcrumb.separator}>
                {getChildren.value?.map(item => (
                  <n-breadcrumb-item>
                    {appSetting.breadcrumb.showDropdown
                      ? renderDropdown(item)
                      : renderBase(item)}
                  </n-breadcrumb-item>
                ))}
              </n-breadcrumb>
            </n-config-provider>
          )}
        </w-transition>
    )
  },
})
</script>
