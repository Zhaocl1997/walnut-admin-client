<template>
  <n-dropdown
    placement="bottom-start"
    @select="onSelect"
    trigger="manual"
    size="medium"
    :x="x"
    :y="y"
    :options="options"
    :show="ctxMenuShow"
    :on-clickoutside="onCloseCtxMenu"
  ></n-dropdown>
</template>

<script lang="tsx" setup>
  import { useRedirect } from '/@/hooks/core/useRedirect'

  import { getTabsContext } from '../hooks/useTabsContext'
  import { useFullScreenExtend } from '/@/components/App/AppFullScreen'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()
  const { tab, app } = useAppState()

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

  const { enter } = useFullScreenExtend()

  const onSelect = async (
    key: ValueOfDeleteTabConst & 'Refresh' & 'Screen Full'
  ) => {
    if (Object.values(DeleteTabConst).includes(key)) {
      onTabRemove(currentMouseTab.value?.name!, key)
    }

    if (key === 'Refresh') {
      const { redirect } = useRedirect()
      await redirect()
    }

    if (key === 'Screen Full') {
      app.value.fullscreenTarget = `#${currentMouseTab.value?.name!}`
      nextTick(() => {
        enter()
      })
    }

    onCloseCtxMenu()
  }

  const options = computed(() => [
    {
      key: DeleteTabConst.TAB_SINGLE,
      label: t('sys:tab:ctx:close'),
      icon: () => (
        <w-icon height="24" icon="ant-design:close-outlined"></w-icon>
      ),
      disabled: getCloseDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_LEFT,
      label: t('sys:tab:ctx:closeLeft'),
      icon: () => (
        <w-icon height="24" icon="ant-design:vertical-right-outlined"></w-icon>
      ),
      disabled: getCloseLeftDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_RIGHT,
      label: t('sys:tab:ctx:closeRight'),
      icon: () => (
        <w-icon height="24" icon="ant-design:vertical-left-outlined"></w-icon>
      ),
      disabled: getCloseRightDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_OTHER,
      label: t('sys:tab:ctx:closeOther'),
      icon: () => (
        <w-icon height="24" icon="ant-design:column-width-outlined"></w-icon>
      ),
      disabled: getCloseOtherDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_ALL,
      label: t('sys:tab:ctx:closeAll'),
      icon: () => (
        <w-icon height="24" icon="ant-design:border-outlined"></w-icon>
      ),
      disabled: getCloseOtherDisabled.value,
    },

    {
      key: 'd1',
      type: 'divider',
    },

    {
      key: 'Refresh',
      label: t('sys:tab:ctx:refresh'),
      icon: () => <w-icon height="24" icon="ant-design:sync-outlined"></w-icon>,
      disabled: getOtherDisabled.value,
    },

    {
      key: 'Screen Full',
      label: t('sys:tab:ctx:screenfull'),
      icon: () => (
        <w-icon height="24" icon="ant-design:fullscreen-outlined"></w-icon>
      ),
      disabled: getOtherDisabled.value,
    },
  ])
</script>
