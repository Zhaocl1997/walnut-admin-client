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
      content-class="grid grid-rows-1"
    >
      <div
        class="sticky left-0 top-0 z-99 transition-transform duration-300 ease-in-out -translate-y-[100%]"
        :class="[{ 'translate-y-0': headerShow }]"
        :style="{ width: appSetting.getCalcContentWidth }"
      >
        <TheHeader ref="headerRef" />
      </div>

      <div
        class="sticky left-0 top-0 z-98 transition-transform duration-500 ease-in-out -translate-y-[100%]"
        :class="[{ 'translate-y-0': tabsShow }]"
        :style="{ top: appSetting.header.status && (headerShow && tabsShow || headerShow && appSetting.getTabsFixed) ? `${appSetting.header.height}px` : '', width: appSetting.getCalcContentWidth }"
      >
        <TheTabs ref="tabsRef" />
      </div>

      <div
        :id="`${String($route.name)}-content`"
        class="relative"
        :style="{
          minHeight: appSetting.getCalcContentHeight,
          padding: $route.meta.ternal === 'internal' ? 0 : `${appSetting.app.contentPadding}px`,
        }"
      >
        <TheContent />
        <TheIFrameWrapper />
      </div>

      <div class="sticky left-0 z-97" :class="[{ 'bottom-0': appSetting.getFooterFixed }]" :style="{ width: appSetting.getCalcContentWidth }">
        <TheFooter />
      </div>
    </n-scrollbar>

    <TheAppBackToTop />
  </div>
</template>
