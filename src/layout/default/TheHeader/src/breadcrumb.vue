<script lang="tsx">
// TODO rework

import type { DropdownOption } from 'naive-ui'
// TODO 111
import WTransition from '@/components/Extra/Transition'
import WIcon from '@/components/UI/Icon'

import { findPath } from 'easy-fns-ts'
import { darkTheme } from 'naive-ui'

export default defineComponent({
  setup() {
    const appMenu = useAppStoreMenu()
    const appSetting = useAppStoreSetting()

    const { t } = useAppI18n()
    const { currentRoute } = useAppRouter()

    const getChildren = computed((): AppSystemMenu[] => {
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
        matched?.push({
          name: currentRoute.value.name as string,
          path: currentRoute.value.path,
          ...currentRoute.value.meta,
        })
      }

      return matched?.filter(item => item.title)
    })

    const renderBase = (item: AppSystemMenu) => (
      <div class="flex flex-row flex-nowrap items-center">
        {appSetting.breadcrumb.showIcon && (
          <WIcon icon={item.icon!} height="20" class="mr-1"></WIcon>
        )}
        <div style="line-height: normal">{t(item.title!)}</div>
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
              label: t(i.title as string),
              icon: appSetting.breadcrumb.showIcon
                ? () => <WIcon icon={i.icon!} height="20"></WIcon>
                : null,
              children: genOptions(i.children),
            } as DropdownOption),
        )
      }
    }

    const renderDropdown = (item: TreeNodeItem<AppSystemMenu>) => (
      <n-dropdown
        onSelect={async (key: string) => {
          await useAppRouterPush({ name: key })
        }}
        show-arrow
        options={genOptions(item.children)}
      >
        {renderBase(item)}
      </n-dropdown>
    )

    return () => (
      <WTransition appear transition-name={appSetting.getBreadcrumbTransition}>
        {appSetting.getBreadcrumbShow && (
          <n-config-provider
            id={appSetting.getBreadcrumbId}
            theme={
              (!isDark.value && appSetting.header.inverted)
              || isDark.value
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
      </WTransition>
    )
  },
})
</script>
