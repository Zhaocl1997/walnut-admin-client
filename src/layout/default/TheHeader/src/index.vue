<template>
  <div class="select-none">
    <div class="*hstack justify-between h-full items-center">
      <div class="*hstack justify-start space-x-2">
        <img
          v-if="appMemo.isMobile"
          src="/assets/logo.png"
          alt="Walnut Admin Logo"
          class="h-9 w-9 m-1"
          @click="() => (appMemo.showAside = true)"
        />

        <template v-else>
          <HeaderCollapse v-if="getShowMenuCollpaseIcon" />
          <HeaderBreadCrumb v-if="headerSettings.showBreadcrumb" />
        </template>
      </div>

      <div
        :class="[
          '*hstack justify-end space-x-2 h-full children:(cursor-pointer flex items-center px-0.5 h-full)',
          { 'space-x-1': appMemo.isMobile },
        ]"
      >
        <WAppFullScreen
          v-if="!appMemo.isMobile && headerSettings.showFullScreen"
        />
        <WAppLock v-if="headerSettings.showLock" />
        <WAppSearch v-if="headerSettings.showSearch" />
        <WAppLocalePicker v-if="headerSettings.showLocale" />
        <WAppDarkMode v-if="headerSettings.showDarkMode" />
        <HeaderAvatar />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderBreadCrumb from './breadcrumb.vue'
  import HeaderCollapse from './collapse.vue'
  import HeaderAvatar from './avatar.vue'
  import { getShowMenuCollpaseIcon } from '/@/settings'

  const { appMemo, settings } = useAppState()
  const headerSettings = settings.value.ForDevelopers.header
</script>
