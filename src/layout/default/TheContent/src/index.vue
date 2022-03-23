<template>
  <router-view v-slot="{ Component, route }">
    <w-transition
      :name="appSettings.showAnimation ? appSettings.animationName : null"
      mode="out-in"
      appear
    >
      <keep-alive v-if="appSettings.keepAlive" :include="getKeepAliveInclude">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>

      <component v-else :is="Component" :key="route.fullPath" />
    </w-transition>
  </router-view>
</template>

<script lang="tsx" setup>
  const { menu, settings } = useAppState()
  const appSettings = settings.value.ForDevelopers.app

  const getKeepAliveInclude = computed(() => {
    if (!appSettings.keepAlive) return []
    return menu.value.keepAliveRouteNames
  })
</script>
