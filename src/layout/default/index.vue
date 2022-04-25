<template>
  <n-layout has-sider>
    <w-transition name="slide-left">
      <TheAside v-if="getShowNormalAside" />
    </w-transition>

    <n-drawer
      v-if="!getShowNormalAside"
      v-model:show="appMemo.showAside"
      :width="settings.ForDevelopers.menu.width + 'px'"
      placement="left"
      :native-scrollbar="false"
    >
      <TheAside />
    </n-drawer>

    <div class="vstack flex-1 h-screen w-full overflow-x-hidden">
      <TheMainHeader v-if="setting.app.fixHeader" />

      <n-layout-content
        bordered
        :native-scrollbar="false"
        :content-style="{ height: '100%' }"
      >
        <TheMainHeader v-if="!setting.app.fixHeader" />

        <div
          :id="String($route.name)"
          class="w-full h-full"
          :style="{
            padding: $route.meta.url ? 0 : setting.app.contentPadding + 'px',
          }"
        >
          <TheIFrameWrapper />
          <TheContent />
        </div>

        <TheFooter v-if="!setting.app.fixFooter" />

        <WAppSettings />

        <n-back-top />
      </n-layout-content>

      <TheFooter v-if="setting.app.fixFooter" />

      <TheAppWatermark v-if="setting.app.showWatermark" />
    </div>
  </n-layout>
</template>

<script lang="tsx" setup>
  import TheAside from './TheAside'
  import TheContent from './TheContent'
  import TheFooter from './TheFooter'

  import TheIFrameWrapper from '../iframe/wrapper.vue'
  import TheMainHeader from './MainHeader.vue'
  import TheAppWatermark from '/@/components/App/AppWatermark'

  import { getShowNormalAside, toggleLeftMenuLayout } from '/@/settings'

  const { appMemo, settings } = useAppState()
  const { currentRoute } = useAppRouter()
  const setting = settings.value.ForDevelopers

  watchEffect(() => {
    if (setting.app.layout === AppLayoutModeConst.LEFT_MENU) {
      setting.app.showLogo = true
      setting.app.showMenu = true
      setting.header.showBreadcrumb = true
    }

    if (setting.app.layout === AppLayoutModeConst.TOP_MENU) {
      setting.app.showLogo = false
      setting.app.showMenu = false
      setting.header.showBreadcrumb = false
      appMemo.value.collapse = false
    }
  })

  watchEffect(() => {
    if (currentRoute.value.query.full) {
      toggleLeftMenuLayout()
    }
  })
</script>
