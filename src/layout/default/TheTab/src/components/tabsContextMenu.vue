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

  import { useRedirect } from '/@/hooks/core/useRedirect'
  import { sortTab } from '/@/core/tab'
  import { getCustomTheme } from '/@/App/src/naive'
  import { toggleLeftMenuLayout } from '/@/settings'

  import { getTabsContext } from '../hooks/useTabsContext'

  // TODO 99
  import WIcon from '/@/components/UI/Icon'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()
  const { tab, settings } = useAppState()
  const { enter } = useFullscreen()

  const {
    x,
    y,
    ctxMenuShow,
    onTabRemove,
    onCloseCtxMenu,
    currentMouseTab,
    currentMouseTabIndex,
  } = getTabsContext()

  const getTabsLength = computed(() => tab.value.tabs.length)
  const getAffixedTabsLength = computed(
    () => tab.value.tabs.filter((i) => i.meta.affix).length
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
    key: ValueOfDeleteTabConst &
      'Refresh' &
      'Screen Full' &
      'Fix' &
      'Snapshot' &
      'NewWindow'
  ) => {
    if (Object.values(DeleteTabConst).includes(key)) {
      onTabRemove(currentMouseTab.value?.name!, key)
    }

    if (key === 'Refresh') {
      const { redirect } = useRedirect()
      await redirect()
    }

    if (key === 'Screen Full') {
      toggleLeftMenuLayout()
      enter()
    }

    if (key === 'Fix') {
      currentMouseTab.value!.meta.affix = !currentMouseTab.value?.meta.affix

      sortTab()
    }

    if (key === 'Snapshot') {
      const target = document.getElementById(currentMouseTab.value?.name!)

      const padding = settings.value.ForDevelopers.app.contentPadding

      toJpeg(target!, {
        width: target?.scrollWidth! + padding * 2,
        height: target?.scrollHeight! + padding * 2,
        canvasWidth: target?.scrollWidth! + padding * 2,
        canvasHeight: target?.scrollHeight! + padding * 2,
        backgroundColor: getCustomTheme.value.bodyColor,
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
      window.open(currentMouseTab.value?.path + '?full=1')
    }

    onCloseCtxMenu()
  }

  const options = computed<DropdownOption[]>(() => [
    {
      key: 'Refresh',
      label: t('app:base:refresh'),
      icon: () => <WIcon height="24" icon="ant-design:sync-outlined"></WIcon>,
      disabled: getOtherDisabled.value,
    },

    {
      key: 'Screen Full',
      label: t('sys:tab:ctx:screenfull'),
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
      key: DeleteTabConst.TAB_SINGLE,
      label: t('sys:tab:ctx:close'),
      icon: () => <WIcon height="24" icon="ant-design:close-outlined"></WIcon>,
      disabled: getCloseDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_LEFT,
      label: t('sys:tab:ctx:closeLeft'),
      icon: () => (
        <WIcon height="24" icon="ant-design:vertical-right-outlined"></WIcon>
      ),
      disabled: getCloseLeftDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_RIGHT,
      label: t('sys:tab:ctx:closeRight'),
      icon: () => (
        <WIcon height="24" icon="ant-design:vertical-left-outlined"></WIcon>
      ),
      disabled: getCloseRightDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_OTHER,
      label: t('sys:tab:ctx:closeOther'),
      icon: () => (
        <WIcon height="24" icon="ant-design:column-width-outlined"></WIcon>
      ),
      disabled: getCloseOtherDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_ALL,
      label: t('sys:tab:ctx:closeAll'),
      icon: () => <WIcon height="24" icon="ant-design:border-outlined"></WIcon>,
      disabled: getCloseOtherDisabled.value,
    },

    {
      key: 'd1',
      type: 'divider',
    },

    {
      key: 'Fix',
      label: currentMouseTab.value?.meta.affix
        ? t('sys:tab:ctx:unfix')
        : t('sys:tab:ctx:fixed'),
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
      label: t('sys:tab:ctx:snapshot'),
      icon: () => <WIcon height="24" icon="mdi:fit-to-screen"></WIcon>,
      disabled: getOtherDisabled.value,
    },

    {
      key: 'NewWindow',
      label: t('sys:tab:ctx:newWindow'),
      icon: () => <WIcon height="24" icon="mdi:dock-window"></WIcon>,
    },
  ])
</script>
