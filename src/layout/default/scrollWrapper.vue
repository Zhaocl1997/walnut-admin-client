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
  <div class="relative h-full w-full">
    <div
      :id="String($route.name)"
      ref="scrollWrapper"
      class="relative h-full w-full overflow-auto transition-height transition-width"
    >
      <!-- TODO top change no animation -->
      <div class="transion sticky left-0 z-99" :class="[{ 'top-0': headerShow }]">
        <TheHeader ref="headerRef" />
      </div>

      <div
        class="sticky left-0 z-98"
        :class="[{ 'top-0': tabsShow }]"
        :style="{ top: headerShow ? `${appSetting.header.height}px` : '' }"
      >
        <TheTabs ref="tabsRef" />
      </div>

      <TheContent
        :id="`${String($route.name)}-content`"
        class="relative w-full"
        :style="{
          padding: `${appSetting.app.contentPadding}px`,
          minHeight: `calc(100vh - ${appSetting.header.height}px - ${appSetting.tabs.height}px - ${appSetting.footer.height}px)`,
        }"
      />
      <TheIFrameWrapper />

      <div class="sticky left-0 z-99" :class="[{ 'bottom-0': appSetting.getFooterFixed }]">
        <TheFooter />
      </div>
    </div>

    <TheAppBackToTop />
  </div>
</template>
