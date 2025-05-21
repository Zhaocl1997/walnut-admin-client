<script lang="ts" setup>
defineOptions({
  name: 'AppSettingBackToTop',
})

const emits = defineEmits<{ backToTop: [] }>()

function onBackTopTop() {
  emits('backToTop')
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
