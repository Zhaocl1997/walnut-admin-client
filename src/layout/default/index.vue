<script lang="ts" setup>
import TheIFrameWrapper from '../iframe/wrapper.vue'
import TheAppBackToTop from './Features/backToTop.vue'
import TheAppWatermark from './Features/watermark.vue'
import TheAside from './TheAside'
import TheContent from './TheContent'
import TheFooter from './TheFooter'

import TheHeader from './TheHeader'
import TheTabs from './TheTab'
import { setLayoutContext } from './useLayoutContext'

import { useStarOnGithub } from './useStarOnGithub'

const appMenu = useAppStoreMenu()
const appSetting = useAppStoreSetting()

const scrollWrapper = useAppScroll()

setLayoutContext({
  scrollWrapper,
})

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
        class="styled-scrollbars relative h-full w-full overflow-clip"
      >
        <div class="h-full w-full">
          <div id="w-header" class="w-full" />
          <div id="w-tabs" class="w-full" />

          <div
            :id="String($route.name)"
            ref="scrollWrapper"
            class="relative h-full overflow-auto transition-height transition-width"
            :style="{
              width: `calc(100vw - ${appSetting.getMenuWidth}px)`,
              height: `calc(100vh - ${appSetting.header.fixed ? appSetting.header.height : 0}px - ${appSetting.tabs.fixed ? appSetting.tabs.height : 0}px - ${appSetting.footer.fixed ? appSetting.footer.height : 0}px)`,
            }"
          >
            <Teleport defer to="#w-header" :disabled="!appSetting.getHeaderFixed">
              <TheHeader />
            </Teleport>
            <Teleport defer to="#w-tabs" :disabled="!appSetting.getTabsFixed">
              <TheTabs />
            </Teleport>

            <TheContent />
            <TheIFrameWrapper />
          </div>

          <TheFooter />

          <TheAppBackToTop />
        </div>
      </n-layout-content>

      <WAppSettings />
      <TheAppWatermark />
    </div>
  </n-layout>
</template>
