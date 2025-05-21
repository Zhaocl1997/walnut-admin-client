<script lang="ts" setup>
import { useLayoutContext } from '@/layout/default/useLayoutContext'

defineOptions({
  name: 'AppSettingBackToTop',
})

const layoutCtx = useLayoutContext()

function onBackTopTop() {
  layoutCtx?.scrollWrapper.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <WIconButton
    :icon-props="{
      height: '24',
      icon: 'ant-design:setting-outlined',
    }"
    :button-props="{
      onClick: onBackTopTop,
    }"
    tooltip
    :tooltip-msg="$t('app.base.backToTop')"
    :tooltip-props="{
      placement: 'left',
    }"
  />
</template>
