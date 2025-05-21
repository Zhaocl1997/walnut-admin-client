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
  name: 'TheScrollContent',
})

const appSetting = useAppStoreSetting()

const { scrollWrapper, top, bottom, directionTop, y, onScrollToTop } = useScrollWrapper()

const { targetRef: headerRef, targetShow: headerShow } = useFixedTopScroll('headerRef', toRefs(appSetting.header), { top, y, directionTop })
const { targetRef: tabsRef, targetShow: tabsShow } = useFixedTopScroll('tabsRef', toRefs(appSetting.tabs), { top, y, directionTop })

watchEffect(() => {
  headerShow.value = top.value || appSetting.getHeaderFixed
  tabsShow.value = top.value || appSetting.getTabsFixed
})

const getFooterShow = computed(() => bottom.value || appSetting.getFooterFixed)

// shit code but fix the problem
watch(() => getFooterShow.value, async (v) => {
  if (v) {
    await nextTick()
    scrollWrapper.value?.scrollTo({
      top: scrollWrapper.value.scrollHeight,
      behavior: 'smooth',
    })
  }
}, { immediate: true })

defineExpose({ onScrollToTop })
</script>

<template>
  <div class="relative h-full w-full transition-all">
    <div class="sticky left-0 top-0 z-99">
      <TheHeader v-show="headerShow" ref="headerRef" />
    </div>

    <div class="sticky left-0 top-0 z-98">
      <TheTabs v-show="tabsShow" ref="tabsRef" />
    </div>

    <div
      :id="String($route.name)"
      ref="scrollWrapper"
      class="relative h-full overflow-auto"
      :style="{
        width: `calc(100vw - ${appSetting.getMenuWidth}px)`,
        height: `calc(100vh - ${headerShow ? appSetting.header.height : 0}px - ${tabsShow ? appSetting.tabs.height : 0}px - ${getFooterShow ? appSetting.footer.height : 0}px)`,
      }"
    >
      <TheContent
        :style="{
          padding: `${appSetting.app.contentPadding}px`,
        }"
        class="h-full w-full"
      />
      <TheIFrameWrapper />
    </div>

    <div class="sticky bottom-0 left-0 z-99">
      <TheFooter v-show="getFooterShow" />
    </div>

    <TheAppBackToTop />
  </div>
</template>
