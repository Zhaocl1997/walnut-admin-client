<template>
  <router-view>
    <template #="{ Component, route }">
      <div :id="Component.type.parentView ? null : route.name">
        <w-transition
          :name="appSettings.showAnimation ? appSettings.animationName : null"
          appear
        >
          <keep-alive
            v-if="appSettings.keepAlive"
            :include="menu.keepAliveRouteNames"
          >
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>

          <component v-else :is="Component" :key="route.fullPath" />
        </w-transition>
      </div>
    </template>
  </router-view>
</template>

<script lang="ts" setup>
  // TODO
  const { menu, settings } = useAppState()
  const appSettings = settings.value.ForDevelopers.app
</script>
