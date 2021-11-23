<script lang="tsx">
  import type { RouteLocationMatched } from 'vue-router'

  export default defineComponent({
    setup() {
      const { settings } = useAppState()
      const breadcrumb = settings.value.ForDevelopers.breadcrumb
      const route = useAppRoute()
      const { t } = useAppI18n()

      const getChildren = computed(() =>
        route.matched.filter((item) => item.meta && item.meta.title)
      )

      const renderBase = (item: RouteLocationMatched) => (
        <div class="inline">
          {breadcrumb.showIcon && (
            <w-icon
              icon={item.meta.icon}
              height="20"
              class="mr-1 -mb-1 text-color"
            ></w-icon>
          )}
          <span class="app-text text-color">{t(item.meta.title!)}</span>
        </div>
      )

      const genOptions = (arr?: RouteRecordRaw[]): unknown => {
        if (!arr || arr?.length === 0) {
          return undefined
        } else {
          return arr?.map((i) => ({
            key: i.name,
            label: t(i.meta?.title!),
            icon: breadcrumb.showIcon
              ? () => <w-icon icon={i.meta?.icon} height="20"></w-icon>
              : null,
            children: genOptions(i.children),
          }))
        }
      }

      const renderDropdown = (item: RouteLocationMatched) => (
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
        <n-breadcrumb separator={breadcrumb.separator}>
          {getChildren.value.map((item) => (
            <n-breadcrumb-item>
              {breadcrumb.showDropdown
                ? renderDropdown(item)
                : renderBase(item)}
            </n-breadcrumb-item>
          ))}
        </n-breadcrumb>
      )
    },
  })
</script>
