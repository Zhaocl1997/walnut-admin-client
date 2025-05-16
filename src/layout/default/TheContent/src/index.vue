<script lang="ts" setup>
import TheExitFullContent from './exitFullContent.vue'

const appMenu = useAppStoreMenu()
const appSetting = useAppStoreSetting()

const contentFull = useRouterQuery('full')

const getKeepAliveInclude = computed(() => {
  if (!appSetting.app.keepAlive)
    return []
  return appMenu.keepAliveRouteNames
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <TheExitFullContent v-if="appSetting.getIsLayoutHidden && !contentFull" />

    <WTransition v-if="appSetting.getTransition" :transition-name="appSetting.getTransition" mode="out-in" appear>
      <keep-alive
        v-if="appSetting.app.keepAlive"
        :include="getKeepAliveInclude"
      >
        <component :is="Component" v-if="localRefreshFlag" :key="route.fullPath" />
      </keep-alive>

      <component :is="Component" v-else :key="route.fullPath" />
    </WTransition>

    <template v-else>
      <keep-alive
        v-if="appSetting.app.keepAlive"
        :include="getKeepAliveInclude"
      >
        <component :is="Component" v-if="localRefreshFlag" :key="route.fullPath" />
      </keep-alive>

      <component :is="Component" v-else :key="route.fullPath" />
    </template>
  </router-view>
</template>
