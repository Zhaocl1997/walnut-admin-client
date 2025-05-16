<script lang="ts" setup>
import WIFrame from './index.vue'

defineOptions({
  name: 'TheIFrameWrapper',
})

const appSetting = useAppStoreSetting()
const appTab = useAppStoreTab()

const getCachedIframeList = computed(() =>
  appTab.iframeList.filter(i => i.cache)
    .filter(e => appTab.tabs.map(i => i.name).includes(e.name!)),
)
</script>

<template>
  <template v-if="getCachedIframeList.length > 0">
    <template v-for="item in getCachedIframeList" :key="item.name">
      <WTransition v-if="appSetting.getTransition" :transition-name="appSetting.getTransition" mode="out-in" appear>
        <WIFrame
          v-if="item.url && appTab.tabs.map((i) => i.name).includes(item.name!)"
          v-show="item.name === $route.name"
          :frame-src="item.url"
        />
      </WTransition>

      <template v-else>
        <WIFrame
          v-if="item.url && appTab.tabs.map((i) => i.name).includes(item.name!)"
          v-show="item.name === $route.name"
          :frame-src="item.url"
        />
      </template>
    </template>
  </template>
</template>
