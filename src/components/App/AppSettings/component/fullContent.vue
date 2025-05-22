<script lang="ts" setup>
defineOptions({
  name: 'WAppSettingsExitFullContent',
})

const appSetting = useAppStoreSetting()

useEventListener('keydown', async (e) => {
  if (e.key === 'Escape') {
    appSetting.toggleLayout(true)
  }
})

function onExitFullContent() {
  appSetting.toggleLayout(true)
}
</script>

<template>
  <WIconButton
    :icon-props="{
      height: '24',
      icon: 'ant-design:setting-outlined',
    }"
    :button-props="{
      onClick: onExitFullContent,
    }"
    tooltip
    :tooltip-msg="$t('app.settings.tooltip.exitFullContent')"
    :tooltip-props="{
      placement: 'left',
    }"
  />
</template>
