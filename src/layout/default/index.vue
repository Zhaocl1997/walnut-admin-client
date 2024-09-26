<script lang="ts" setup>
import TheIFrameWrapper from '../iframe/wrapper.vue'
import TheAside from './TheAside'
import TheContent from './TheContent'
import TheFooter from './TheFooter'
import TheHeader from './TheHeader'
import TheTabs from './TheTab'

import TheAppWatermark from './Features/watermark.vue'
import TheAppBackToTop from './Features/backToTop.vue'

import { useStarOnGithub } from './useStarOnGithub'

const appMenu = useAppStoreMenu()
const appSetting = useAppStoreSetting()

const { scrollWrapper } = useAppScroll()

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
    <WTransition appear name="slide-left">
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
      class="h-screen vstack flex-1"
      :style="{ width: `calc(100vw - ${appSetting.menu.width}px)` }"
    >
      <n-layout-content
        bordered
        :native-scrollbar="false"
        :content-style="{ height: '100%' }"
        class="relative"
      >
        <div
          :id="$route.name"
          ref="scrollWrapper"
          class="relative h-full flex flex-col" :class="[
            {
              'overflow-x-hidden styled-scrollbars': !$route.meta.url,
            },
          ]"
        >
          <TheHeader />
          <TheTabs />

          <TheIFrameWrapper />

          <TheContent
            :class="{ 'min-w-fit': $route.meta.position }"
            class="grow"
            :style="{
              padding: $route.meta.url
                ? 0
                : `${appSetting.app.contentPadding}px`,
            }"
          />

          <WAppSettings />

          <TheFooter />
        </div>

        <TheAppBackToTop />
      </n-layout-content>

      <TheAppWatermark />
    </div>
  </n-layout>
</template>

<style>
  .styled-scrollbars {
  /* Foreground, Background */
  scrollbar-color: #999 #333;
}
.styled-scrollbars::-webkit-scrollbar {
  width: 8px; /* Mostly for vertical scrollbars */
  height: 10px; /* Mostly for horizontal scrollbars */
}
.styled-scrollbars::-webkit-scrollbar-thumb {
  /* Foreground */
  background: #999;
}
.styled-scrollbars::-webkit-scrollbar-track {
  /* Background */
  background: #333;
}
</style>
