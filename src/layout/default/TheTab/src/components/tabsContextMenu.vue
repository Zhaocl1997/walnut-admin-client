<template>
  <transition name="zoom-out" mode="out-in">
    <div
      ref="tabsContextMenu"
      v-if="ctxMenuVisible"
      class="border border-solid border-gray-600 border-opacity-50 rounded p-1"
      :style="getCtxMenuStyle"
    >
      <ul class="flex flex-col flex-wrap">
        <li
          v-for="(item, index) in methodLists"
          :key="index"
          :class="[
            'flex flex-row flex-nowrap items-center mx-1 px-0.5 my-0.5 cursor-pointer',
            {
              'cursor-not-allowed text-gray-400': item.disabled,
              'hover:bg-blue-200': !item.disabled,
              'border-b-1 border-gray-300': item.divider,
            },
          ]"
          @click="!item.disabled ? item.event() : emptyFunction()"
        >
          <w-icon :icon="item.icon" height="22"></w-icon>

          <span
            class="
              whitespace-nowrap
              font-sans
              text-base
              antialiased
              m-1
              select-none
            "
            >{{ item.name }}</span
          >
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
  import { emptyFunction } from '/@/utils'
  import { DeleteTabTypeEnum } from '/@/enums/tab'
  import { useRedirect } from '/@/hooks/core/useRedirect'

  import { getTabsContext } from '../hooks/useTabsContext'
  import { useAppFullScreen } from '/@/components/App/AppFullScreen/useAppFullScreen'

  export default defineComponent({
    name: 'TabsContextMenu',

    inheritAttrs: false,

    setup() {
      const { t } = useAppI18n()
      const { currentRoute } = useAppRouter()

      const tabsContextMenu = ref(null)

      const {
        getTabs,
        onTabRemove,
        ctxMenuVisible,
        currentTabName,
        currentTabIndex,
        getCtxMenuStyle,
        onCloseCtxMenu,
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

      onClickOutside(tabsContextMenu, () => {
        onCloseCtxMenu()
      })

      const methodLists = computed(() => {
        return [
          {
            name: t('layout.tab.close'),
            icon: 'ant-design:close-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_SELF)

              onCloseCtxMenu()
            },
            disabled: getCloseDisabled.value,
          },
          {
            name: t('layout.tab.closeLeft'),
            icon: 'ant-design:vertical-right-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_LEFT)

              onCloseCtxMenu()
            },
            disabled: getCloseLeftDisabled.value,
          },
          {
            name: t('layout.tab.closeRight'),
            icon: 'ant-design:vertical-left-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_RIGHT)

              onCloseCtxMenu()
            },
            disabled: getCloseRightDisabled.value,
          },
          {
            name: t('layout.tab.closeOther'),
            icon: 'ant-design:column-width-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_OTHER)

              onCloseCtxMenu()
            },
            disabled: getCloseOtherDisabled.value,
          },
          {
            name: t('layout.tab.closeAll'),
            icon: 'ant-design:border-outlined',
            event: () => {
              onTabRemove(currentTabName.value, DeleteTabTypeEnum.TAB_ALL)

              onCloseCtxMenu()
            },
            divider: true,
          },
          {
            name: t('layout.tab.refresh'),
            icon: 'ant-design:sync-outlined',
            event: async () => {
              const { redirect } = useRedirect()

              await redirect()

              onCloseCtxMenu()
            },
            disabled: getOtherDisabled.value,
          },
          {
            name: t('layout.tab.screenfull'),
            icon: 'ant-design:fullscreen-outlined',
            event: () => {
              const { toggleFullScreen } = useAppFullScreen({
                target: `#${currentTabName.value}`,
              })

              toggleFullScreen()

              onCloseCtxMenu()
            },
            disabled: getOtherDisabled.value,
          },
        ]
      })

      return {
        tabsContextMenu,
        ctxMenuVisible,
        getCtxMenuStyle,
        methodLists,
        emptyFunction,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
