<template>
  <n-dropdown
    placement="bottom-start"
    @select="onSelect"
    trigger="manual"
    size="medium"
    :x="x"
    :y="y"
    :options="options"
    :show="ctxMenuVisible"
    :on-clickoutside="onCloseCtxMenu"
  ></n-dropdown>
</template>

<script lang="tsx" setup>
  import { useRedirect } from '/@/hooks/core/useRedirect'

  import { getTabsContext } from '../hooks/useTabsContext'
  import { useFullScreenExtend } from '/@/components/App/AppFullScreen/useAppFullScreen'

  const { t } = useAppI18n()
  const { currentRoute } = useAppRouter()
  const { tab, app } = useAppState()

  const { x, y, ctxMenuVisible, onTabRemove, onCloseCtxMenu } = getTabsContext()

  const getTabsLength = computed(() => tab.value.tabs.length)
  const getAffixedTabsLength = computed(
    () => tab.value.tabs.filter((i) => i.meta.affix).length
  )

  const getCloseDisabled = computed(() => tab.value.targetTab?.meta.affix)
  const getCloseLeftDisabled = computed(
    () =>
      getAffixedTabsLength.value === tab.value.targetTabIndex ||
      tab.value.targetTab?.meta.affix
  )
  const getCloseRightDisabled = computed(
    () =>
      getTabsLength.value - 1 === tab.value.targetTabIndex ||
      tab.value.targetTab?.meta.affix
  )
  const getCloseOtherDisabled = computed(
    () => getTabsLength.value - 1 === getAffixedTabsLength.value
  )

  const getOtherDisabled = computed(
    () =>
      currentRoute.value.name !==
      (tab.value.targetTab?.name ?? currentRoute.value.name)
  )

  const { enter } = useFullScreenExtend()

  const onSelect = async (
    key: ValueOfDeleteTabConst & 'Refresh' & 'Screen Full'
  ) => {
    if (Object.values(DeleteTabConst).includes(key)) {
      onTabRemove(tab.value.targetTab?.name!, key)
    }

    if (key === 'Refresh') {
      const { redirect } = useRedirect()
      await redirect()
    }

    if (key === 'Screen Full') {
      app.value.fullscreenTarget = `#${tab.value.targetTab?.name!}`
      nextTick(() => {
        enter()
      })
    }

    onCloseCtxMenu()
  }

  const options = computed(() => [
    {
      key: DeleteTabConst.TAB_SINGLE,
      label: t('layout.tab.close'),
      icon: () => (
        <w-icon height="24" icon="ant-design:close-outlined"></w-icon>
      ),
      disabled: getCloseDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_LEFT,
      label: t('layout.tab.closeLeft'),
      icon: () => (
        <w-icon height="24" icon="ant-design:vertical-right-outlined"></w-icon>
      ),
      disabled: getCloseLeftDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_RIGHT,
      label: t('layout.tab.closeRight'),
      icon: () => (
        <w-icon height="24" icon="ant-design:vertical-left-outlined"></w-icon>
      ),
      disabled: getCloseRightDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_OTHER,
      label: t('layout.tab.closeOther'),
      icon: () => (
        <w-icon height="24" icon="ant-design:column-width-outlined"></w-icon>
      ),
      disabled: getCloseOtherDisabled.value,
    },

    {
      key: DeleteTabConst.TAB_ALL,
      label: t('layout.tab.closeAll'),
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
      label: t('layout.tab.refresh'),
      icon: () => <w-icon height="24" icon="ant-design:sync-outlined"></w-icon>,
      disabled: getOtherDisabled.value,
    },

    {
      key: 'Screen Full',
      label: t('layout.tab.screenfull'),
      icon: () => (
        <w-icon height="24" icon="ant-design:fullscreen-outlined"></w-icon>
      ),
      disabled: getOtherDisabled.value,
    },
  ])
</script>
