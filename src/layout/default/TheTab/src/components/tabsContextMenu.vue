<template>
  <ul class="flex flex-col flex-wrap bg-primary">
    <li
      v-for="(item, index) in methodLists"
      :key="index"
      :class="[
        'flex flex-row flex-nowrap items-center mx-1 px-0.5 my-0.5 cursor-pointer',
        {
          'cursor-not-allowed text-gray-400': item.disabled,
          'hover:bg-blue-200': !item.disabled,
          'border-b-4 border-gray-300': item.divider,
        },
      ]"
      @click="!item.disabled ? item.event() : emptyFunction()"
    >
      <w-icon :icon="item.icon" height="22"></w-icon>

      <span
        class="whitespace-nowrap font-sans text-base text-primary antialiased m-1 select-none"
        >{{ item.name }}</span
      >
    </li>
  </ul>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  import { emptyFunction } from '/@/utils'
  import { DeleteTabTypeEnum } from '/@/enums/tab'
  import { useRedirect } from '/@/hooks/core/useRedirect'

  import { useTabsContext } from '../hooks/useTabsContext'
  import { useScreenfull } from '/@/components/Help/Screenfull/useScreenfull'
  import { useAppRouter } from '/@/router'
  import { useI18n } from '/@/locales'

  export default defineComponent({
    name: 'TabsContextMenu',

    inheritAttrs: false,

    setup() {
      const { t } = useI18n()
      const { getTabsContext } = useTabsContext()
      const { currentRoute } = useAppRouter()

      const {
        currentTabName,
        currentTabIndex,
        onTabRemove,
        closeContextMenu,
        getTabs,
      } = getTabsContext()

      const getCloseDisabled = computed(() => currentTabIndex.value === 0)
      const getCloseLeftDisabled = computed(
        () => currentTabIndex.value === 1 || currentTabIndex.value === 0
      )
      const getCloseRightDisabled = computed(
        () =>
          currentTabIndex.value === getTabs.value.length - 1 ||
          currentTabIndex.value === 0
      )
      const getCloseOtherDisabled = computed(() => getTabs.value.length === 2)
      const getOtherDisabled = computed(
        () => currentRoute.value.name !== currentTabName.value
      )

      const methodLists = computed(() => {
        return [
          {
            name: t('layout.tab.close'),
            icon: 'ant-design:close-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_SELF)

              closeContextMenu()
            },
            disabled: getCloseDisabled.value,
          },
          {
            name: t('layout.tab.closeLeft'),
            icon: 'ant-design:vertical-right-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_LEFT)

              closeContextMenu()
            },
            disabled: getCloseLeftDisabled.value,
          },
          {
            name: t('layout.tab.closeRight'),
            icon: 'ant-design:vertical-left-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_RIGHT)

              closeContextMenu()
            },
            disabled: getCloseRightDisabled.value,
          },
          {
            name: t('layout.tab.closeOther'),
            icon: 'ant-design:column-width-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_OTHER)

              closeContextMenu()
            },
            disabled: getCloseOtherDisabled.value,
          },
          {
            name: t('layout.tab.closeAll'),
            icon: 'ant-design:border-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_ALL)

              closeContextMenu()
            },
            divider: true,
          },
          {
            name: t('layout.tab.refresh'),
            icon: 'ant-design:sync-outlined',
            event: async () => {
              const { redirect } = useRedirect()

              await redirect()

              closeContextMenu()
            },
            disabled: getOtherDisabled.value,
          },
          {
            name: t('layout.tab.screenfull'),
            icon: 'ant-design:fullscreen-outlined',
            event: () => {
              const { onToggleScreenfull } = useScreenfull({
                target: `#${currentTabName.value}`,
              })

              onToggleScreenfull()

              closeContextMenu()
            },
            disabled: getOtherDisabled.value,
          },
        ]
      })

      return {
        methodLists,
        emptyFunction,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
