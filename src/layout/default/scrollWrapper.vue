<script lang="ts" setup>
import TheIFrameWrapper from '../iframe/wrapper.vue'
import TheAppBackToTop from './Features/backToTop.vue'
import { useFixedTopScroll } from './hooks/useFixedTopScroll'
import { useScrollWrapper } from './hooks/useScrollWrapper'
import TheContent from './TheContent'
import TheFooter from './TheFooter'
import TheHeader from './TheHeader'
import TheTabs from './TheTab'

defineOptions({
  name: 'TheScrollWrapper',
})

const appSetting = useAppStoreSetting()

const { scrollWrapper, top, directionTop, y, onScrollToTop } = useScrollWrapper()

const { targetRef: headerRef, targetShow: headerShow } = useFixedTopScroll('headerRef', toRefs(appSetting.header), { top, y, directionTop })
const { targetRef: tabsRef, targetShow: tabsShow } = useFixedTopScroll('tabsRef', toRefs(appSetting.tabs), { top, y, directionTop })

watchEffect(() => {
  headerShow.value = top.value || appSetting.getHeaderFixed
  tabsShow.value = top.value || appSetting.getTabsFixed
})

defineExpose({ onScrollToTop })
</script>

<template>
  <div ref="scrollWrapper" class="relative h-full">
    <n-scrollbar
      :id="String($route.name)"
      x-scrollable
    >
      <!-- TODO top change no animation -->
      <div class="sticky left-0 z-99 transition-top" :class="[{ 'top-0': headerShow }]" :style="{ width: appSetting.getCalcContentWidth }">
        <TheHeader ref="headerRef" />
      </div>

      <div
        class="sticky left-0 z-98 transition-top"
        :class="[{ 'top-0': tabsShow }]"
        :style="{ top: headerShow && appSetting.getTabsFixed ? `${appSetting.header.height}px` : '', width: appSetting.getCalcContentWidth }"
      >
        <TheTabs ref="tabsRef" />
      </div>

      <TheContent
        :id="`${String($route.name)}-content`"
        class="relative"
        :style="{
          padding: `${appSetting.app.contentPadding}px`,
          minHeight: `calc(100vh - ${appSetting.header.height}px - ${appSetting.tabs.height}px - ${appSetting.footer.height}px)`,
        }"
      />
      <TheIFrameWrapper />

      <div class="sticky left-0 z-1" :class="[{ 'bottom-0': appSetting.getFooterFixed }]" :style="{ width: appSetting.getCalcContentWidth }">
        <TheFooter />
      </div>
    </n-scrollbar>

    <TheAppBackToTop />
  </div>
</template>
