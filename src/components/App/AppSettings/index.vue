<script lang="ts" setup>
import AppSettingBackToTop from './component/backToTop.vue'
import AppSettingsForm from './component/form/index.vue'
import AppSettingExitFullContent from './component/fullContent.vue'

defineOptions({
  name: 'AppSettings',
})

const emits = defineEmits<{ backToTop: [] }>()

const appSetting = useAppStoreSetting()

const contentFull = useRouterQuery('full')

function onBackToTop() {
  emits('backToTop')
}
</script>

<template>
  <n-float-button position="fixed" bottom="120" right="60" menu-trigger="hover" style="z-index:9999">
    <WIcon
      id="walnut-settings"
      height="24"
      icon="ant-design:setting-outlined"
    />

    <template #menu>
      <n-float-button v-if="appSetting.getIsLayoutHidden && !contentFull">
        <AppSettingExitFullContent />
      </n-float-button>

      <n-float-button>
        <AppSettingsForm />
      </n-float-button>

      <n-float-button v-if="!appSetting.getBackToTopIsStandalone">
        <AppSettingBackToTop @back-to-top="onBackToTop" />
      </n-float-button>
    </template>
  </n-float-button>
</template>
