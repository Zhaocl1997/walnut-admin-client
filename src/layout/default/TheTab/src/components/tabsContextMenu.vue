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
  import { hideLayout } from '/@/settings'

  import { getTabsContext } from '../hooks/useTabsContext'

  // TODO 99
  import WIcon from '/@/components/UI/Icon'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()
  const { tab } = useAppState()
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
      hideLayout()
      enter()
    }

    if (key === 'Fix') {
      currentMouseTab.value!.meta.affix = !currentMouseTab.value?.meta.affix

      sortTab()
    }

    if (key === 'Snapshot') {
      const target = document.getElementById(currentMouseTab.value?.name!)

      toJpeg(target!, {
        width: target?.scrollWidth! + 32,
        height: target?.scrollHeight,
        canvasWidth: target?.scrollWidth! + 32,
        canvasHeight: target?.scrollHeight,
        style: {
          margin: '1rem',
        },
      }).then(function (dataUrl) {
        const windowOpen = window.open('about:blank', 'image from canvas')
        windowOpen!.document.write(
          `<img src='${dataUrl}' alt='${currentMouseTab.value?.name}'>`
        )
      })
    }

    if (key === 'NewWindow') {
      window.open(currentRoute.value.fullPath + '?full=1')
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
      label: currentMouseTab.value?.meta.affix ? 'Unfix' : 'Fixed',
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
      label: 'Snapshot',
      icon: () => <WIcon height="24" icon="mdi:fit-to-screen"></WIcon>,
      disabled: getOtherDisabled.value,
    },

    {
      key: 'NewWindow',
      label: 'Open in window',
      icon: () => <WIcon height="24" icon="mdi:dock-window"></WIcon>,
      disabled: getOtherDisabled.value,
    },
  ])
</script>
