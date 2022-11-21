<template>
  <router-view v-slot="{ Component, route }">
    <w-transition :name="getTransitionName" mode="out-in" appear>
      <keep-alive
        v-if="appSetting.settings.app.keepAlive"
        :include="getKeepAliveInclude"
      >
        <component :is="Component" :key="route.fullPath"></component>
      </keep-alive>

      <component v-else :is="Component" :key="route.fullPath"></component>
    </w-transition>
  </router-view>
</template>

<script lang="tsx" setup>
  const appMenu = useAppStoreMenu()
  const appSetting = useAppStoreSetting()

  const { currentRoute } = useAppRouter()

  const getKeepAliveInclude = computed(() => {
    if (!appSetting.settings.app.keepAlive) return []
    return appMenu.keepAliveRouteNames
  })

  const getTransitionName = computed(() => {
    const setting = appSetting.settings.app
    if (setting.showAnimation) {
      if (setting.animationMode === AppConstAnimationMode.GLOBAL) {
        return setting.animationName
      } else {
        return (
          currentRoute.value.meta?.animationName || AppConstTransitionName.FADE
        )
      }
    }
    return null
  })
</script>
