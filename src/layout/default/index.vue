<template>
  <n-layout has-sider>
    <w-transition appear name="slide-left">
      <TheAside
        v-if="appSetting.getShowNormalAside"
        class="walnut-aside"
      ></TheAside>
    </w-transition>

    <n-drawer
      v-if="!appSetting.getShowNormalAside"
      v-model:show="appMenu.showAside"
      :width="appSetting.settings.menu.width + 'px'"
      placement="left"
      :native-scrollbar="false"
    >
      <TheAside></TheAside>
    </n-drawer>

    <div class="vstack flex-1 h-screen w-full overflow-x-hidden">
      <TheMainHeader
        v-if="appSetting.settings.app.fixHeader"
        class="walnut-header"
      ></TheMainHeader>

      <n-layout-content
        bordered
        :native-scrollbar="false"
        :content-style="{ height: '100%' }"
        class="walnut-content"
      >
        <TheMainHeader
          v-if="!appSetting.settings.app.fixHeader"
        ></TheMainHeader>

        <div
          :id="String($route.name)"
          class="w-full h-full"
          :style="{
            padding: $route.meta.url
              ? 0
              : appSetting.settings.app.contentPadding + 'px',
          }"
        >
          <TheIFrameWrapper></TheIFrameWrapper>
          <TheContent></TheContent>
        </div>

        <TheFooter v-if="!appSetting.settings.app.fixFooter"></TheFooter>

        <WAppSettings></WAppSettings>

        <n-back-top></n-back-top>
      </n-layout-content>

      <TheFooter v-if="appSetting.settings.app.fixFooter"></TheFooter>

      <TheAppWatermark
        v-if="appSetting.settings.app.showWatermark"
      ></TheAppWatermark>
    </div>
  </n-layout>
</template>

<script lang="tsx" setup>
  import TheAside from './TheAside'
  import TheContent from './TheContent'
  import TheFooter from './TheFooter'

  import TheIFrameWrapper from '../iframe/wrapper.vue'
  import TheMainHeader from './MainHeader.vue'
  import TheAppWatermark from '@/components/App/AppWatermark'

  const appMenu = useAppStoreMenu()
  const appSetting = useAppStoreSetting()

  // TODO layout
  // watchEffect(() => {
  //   if (setting.app.layout === AppConstLayoutMode.LEFT_MENU) {
  //     setting.app.showLogo = true
  //     setting.app.showMenu = true
  //     setting.header.showBreadcrumb = true
  //   }

  //   if (setting.app.layout === AppConstLayoutMode.TOP_MENU) {
  //     setting.app.showLogo = false
  //     setting.app.showMenu = false
  //     setting.header.showBreadcrumb = false
  //     appMemo.value.collapse = false
  //   }
  // })

  useAppIntro()
  useAppContentFull()
  useAppPageLeave()
  useAppAutoLock()
  useAppTextSelection()
  useAppColorMode()
  useAppReducedMotion()
</script>
