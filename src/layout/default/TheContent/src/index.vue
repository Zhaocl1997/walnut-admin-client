<script lang="ts" setup>
const appMenu = useAppStoreMenu()
const appSetting = useAppStoreSetting()

const getKeepAliveInclude = computed(() => {
  if (!appSetting.app.keepAlive)
    return []
  return appMenu.keepAliveRouteNames
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <WTransition :name="appSetting.getTransition" mode="out-in" appear>
      <keep-alive
        v-if="appSetting.app.keepAlive"
        :include="getKeepAliveInclude"
      >
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>

      <component :is="Component" v-else :key="route.fullPath" />
    </WTransition>
  </router-view>
</template>
