<template>
  <router-view v-slot="{ Component, route }">
    <w-transition
      :name="
        appSetting.settings.app.showAnimation
          ? appSetting.settings.app.animationName
          : null
      "
      mode="out-in"
      appear
    >
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

  const getKeepAliveInclude = computed(() => {
    if (!appSetting.settings.app.keepAlive) return []
    return appMenu.keepAliveRouteNames
  })
</script>
