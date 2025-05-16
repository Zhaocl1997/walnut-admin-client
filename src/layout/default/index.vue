<script lang="ts" setup>
import TheIFrameWrapper from '../iframe/wrapper.vue'
import TheAppBackToTop from './Features/backToTop.vue'
import TheScrollWrapper from './Features/scrollWrapper.vue'
import TheAppWatermark from './Features/watermark.vue'
import TheAside from './TheAside'
import TheContent from './TheContent'
import TheFooter from './TheFooter'

import TheHeader from './TheHeader'
import TheTabs from './TheTab'

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
      class="h-screen vstack flex-1 overflow-hidden"
      :style="{ width: `calc(100vw - ${appSetting.getMenuWidth}px)` }"
    >
      <n-layout-content
        bordered
        :native-scrollbar="false"
        :content-style="{ height: '100%' }"
        class="relative"
      >
        <div
          :id="String($route.name)"
          class="styled-scrollbars relative h-full w-full overflow-hidden"
        >
          <TheHeader />
          <TheTabs />

          <TheScrollWrapper>
            <TheContent
              :style="{
                padding: $route.meta.url
                  ? 0
                  : `${appSetting.app.contentPadding}px`,
              }"
            />

            <TheIFrameWrapper />
          </TheScrollWrapper>

          <TheFooter />
        </div>

        <TheAppBackToTop />
      </n-layout-content>

      <WAppSettings />
      <TheAppWatermark />
    </div>
  </n-layout>
</template>
