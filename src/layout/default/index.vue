<script lang="ts" setup>
import TheAppWatermark from './Features/watermark.vue'
import TheScrollContent from './scrollContent.vue'
import TheScrollWrapper from './scrollWrapper.vue'
import TheAside from './TheAside'

import { useStarOnGithub } from './useStarOnGithub'

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

// P2 layout level hook
useAppIntro()
useAppContentFull()
useAppTextSelection()
useAppColorMode()
useAppHijackF5()

if (!isDev()) {
  useTimeoutFn(() => {
    useStarOnGithub()
  }, 500)
}
</script>

<template>
  <n-layout has-sider>
    <WTransition appear transition-name="slide-left">
      <TheAside
        v-if="appSetting.getMenuAdapterStatus"
        class="walnut-aside"
      />
    </WTransition>

    <n-drawer
      v-if="!appSetting.getMenuAdapterStatus"
      v-model:show="appMenu.showAside"
      :width="`${appSetting.menu.width}px`"
      placement="left"
      :native-scrollbar="false"
    >
      <TheAside />
    </n-drawer>

    <div
      class="h-screen"
      :style="{ width: `calc(100vw - ${appSetting.getMenuWidth}px)` }"
    >
      <n-layout-content
        bordered
        :native-scrollbar="false"
        :content-style="{ height: '100%' }"
        class="relative h-full w-full"
      >
        <TheScrollContent v-if="appSetting.getScrollModeIsContent" />
        <TheScrollWrapper v-else-if="appSetting.getScrollModeIsWrapper" />
      </n-layout-content>

      <WAppSettings />
      <TheAppWatermark />
    </div>
  </n-layout>
</template>
