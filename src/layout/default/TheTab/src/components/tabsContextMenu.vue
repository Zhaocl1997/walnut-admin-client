<template>
  <n-dropdown
    placement="bottom-start"
    @select="onSelect"
    trigger="manual"
    size="small"
    :x="x"
    :y="y"
    :options="options"
    :show="ctxMenuShow"
    :on-clickoutside="onCloseCtxMenu"
  ></n-dropdown>
</template>

<script lang="tsx" setup>
  import type { DropdownOption } from 'naive-ui'

  import { toJpeg } from 'html-to-image'

  import { getThemeOverridesCommon } from '@/App/src/naive/src/theme'

  import { getTabsContext } from '../hooks/useTabsContext'

  // TODO 99
  import WIcon from '@/components/UI/Icon'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()
  const { enter } = useFullscreen()

  const appTab = useAppStoreTab()
  const appSetting = useAppStoreSetting()

  const {
    x,
    y,
    onScrollToCurrentTab,
    ctxMenuShow,
    onTabRemove,
    onCloseCtxMenu,
    currentMouseTab,
    currentMouseTabIndex,
    onOpenDevTool,
  } = getTabsContext()

  const getTabsLength = computed(() => appTab.tabs.length)
  const getAffixedTabsLength = computed(
    () => appTab.tabs.filter((i) => i.meta.affix).length
  )

  // only affixed can not close
  const getCloseDisabled = computed(() => currentMouseTab.value?.meta.affix)

  // the one closest to the affixed is left disabled
  const getCloseLeftDisabled = computed(
    () =>
      getAffixedTabsLength.value === currentMouseTabIndex.value ||
      currentMouseTab.value?.meta.affix
  )

  // the last one tab is right disabled
  const getCloseRightDisabled = computed(
    () =>
      getTabsLength.value - 1 === currentMouseTabIndex.value ||
      currentMouseTab.value?.meta.affix
  )

  // affixed, only true when all tabs left are affixed
  // not affixed, only true when gap is 1, which means only one not affixed tab left
  const getCloseOtherDisabled = computed(() =>
    currentMouseTab.value?.meta.affix
      ? getTabsLength.value === getAffixedTabsLength.value
      : getTabsLength.value - 1 === getAffixedTabsLength.value
  )

  // refresh and full screen only work in current route tab
  const getOtherDisabled = computed(
    () => currentRoute.value.name !== currentMouseTab.value?.name
  )

  const onSelect = async (
    key: ValueOfAppConstTabDeleteType &
      'Refresh' &
      'Screen Full' &
      'Fix' &
      'Snapshot' &
      'NewWindow'
  ) => {
    if (Object.values(AppConstTabDeleteType).includes(key)) {
      onTabRemove(currentMouseTab.value?.name!, key)
    }

    if (key === 'Refresh') {
      await useRedirect()
    }

    if (key === 'Screen Full') {
      appSetting.toggleLeftMenuLayout()
      enter()
    }

    if (key === 'Fix') {
      appTab.setTab(currentMouseTabIndex.value, {
        meta: { affix: !currentMouseTab.value?.meta.affix },
      })

      appTab.sortTabs()

      onScrollToCurrentTab()
    }

    if (key === 'Snapshot') {
      const target = document.getElementById(currentMouseTab.value?.name!)

      const padding = appSetting.settings.app.contentPadding

      toJpeg(target!, {
        width: target?.scrollWidth! + padding * 2,
        height: target?.scrollHeight! + padding * 2,
        canvasWidth: target?.scrollWidth! + padding * 2,
        canvasHeight: target?.scrollHeight! + padding * 2,
        backgroundColor: getThemeOverridesCommon.value.bodyColor,
        style: {
          margin: padding + 'px',
        },
      }).then(function (dataUrl) {
        const windowOpen = window.open('about:blank', 'image from canvas')
        windowOpen!.document.write(
          `<img src='${dataUrl}' alt='${currentMouseTab.value?.name}'>`
        )
      })
    }

    if (key === 'NewWindow') {
      openExternalLink(currentMouseTab.value?.path + '?full=1')
    }

    if (key === 'DevTool') {
      onOpenDevTool()
    }

    onCloseCtxMenu()
  }

  const options = computed<DropdownOption[]>(() => [
    {
      key: 'Refresh',
      label: t('app.tab.utils.refresh'),
      icon: () => <WIcon height="24" icon="ant-design:sync-outlined"></WIcon>,
      disabled: getOtherDisabled.value,
    },

    {
      key: 'Screen Full',
      label: t('app.tab.ctx.screenfull'),
      icon: () => (
        <WIcon height="24" icon="ant-design:fullscreen-outlined"></WIcon>
      ),
      disabled: getOtherDisabled.value,
    },

    {
      key: 'd1',
      type: 'divider',
    },

    {
      key: AppConstTabDeleteType.TAB_SINGLE,
      label: t('app.tab.ctx.close'),
      icon: () => <WIcon height="24" icon="ant-design:close-outlined"></WIcon>,
      disabled: getCloseDisabled.value,
    },

    {
      key: AppConstTabDeleteType.TAB_LEFT,
      label: t('app.tab.ctx.closeLeft'),
      icon: () => (
        <WIcon height="24" icon="ant-design:vertical-right-outlined"></WIcon>
      ),
      disabled: getCloseLeftDisabled.value,
    },

    {
      key: AppConstTabDeleteType.TAB_RIGHT,
      label: t('app.tab.ctx.closeRight'),
      icon: () => (
        <WIcon height="24" icon="ant-design:vertical-left-outlined"></WIcon>
      ),
      disabled: getCloseRightDisabled.value,
    },

    {
      key: AppConstTabDeleteType.TAB_OTHER,
      label: t('app.tab.ctx.closeOther'),
      icon: () => (
        <WIcon height="24" icon="ant-design:column-width-outlined"></WIcon>
      ),
      disabled: getCloseOtherDisabled.value,
    },

    {
      key: AppConstTabDeleteType.TAB_ALL,
      label: t('app.tab.ctx.closeAll'),
      icon: () => <WIcon height="24" icon="ant-design:border-outlined"></WIcon>,
      disabled: getCloseOtherDisabled.value,
    },

    {
      key: 'd2',
      type: 'divider',
    },

    {
      key: 'Fix',
      label: currentMouseTab.value?.meta.affix
        ? t('app.tab.ctx.unfix')
        : t('app.tab.ctx.fixed'),
      icon: () => (
        <WIcon
          height="24"
          icon={
            currentMouseTab.value?.meta.affix
              ? 'ant-design:pushpin-filled'
              : 'ant-design:pushpin-outlined'
          }
        ></WIcon>
      ),
    },

    {
      key: 'Snapshot',
      label: t('app.tab.ctx.snapshot'),
      icon: () => <WIcon height="24" icon="mdi:fit-to-screen"></WIcon>,
      disabled: getOtherDisabled.value,
    },

    {
      key: 'NewWindow',
      label: t('app.tab.ctx.newWindow'),
      icon: () => <WIcon height="24" icon="mdi:dock-window"></WIcon>,
    },

    {
      key: 'd3',
      type: 'divider',
      show: isDev(),
    },

    {
      key: 'DevTool',
      label: 'DevTool',
      icon: () => <WIcon height="24" icon="mdi:developer-board"></WIcon>,
      show: isDev(),
    },
  ])
</script>
