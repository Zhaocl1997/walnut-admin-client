<script lang="ts" setup>
defineOptions({
  name: 'AppSearch',
})

const { t } = useAppI18n()

function onClick() {
  useAppMsgInfo(t('app.base.wip'))
}
</script>

<template>
  <div @click="onClick">
    <WIcon icon="ant-design:search-outlined" height="24" />
  </div>
</template>
