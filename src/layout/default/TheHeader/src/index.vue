<template>
  <div class="select-none">
    <div class="hstack justify-between h-full items-center">
      <div class="hstack items-center justify-between space-x-2">
        <img
          v-if="appMemo.isMobile"
          src="/assets/logo.png"
          :alt="`${getAppTitle} Logo`"
          class="h-9 w-9 m-1"
          @click="() => (appMemo.showAside = true)"
        />

        <template v-else>
          <HeaderCollapse v-if="getShowMenuCollpaseIcon" />

          <w-transition name="slide-left">
            <HeaderBreadCrumb v-if="headerSettings.showBreadcrumb" />
          </w-transition>
        </template>

        <w-transition name="slide-up">
          <div
            v-if="settings.ForDevelopers.app.layout === 'top-menu'"
            class="hstack items-center justify-between"
          >
            <TheLogo class="mr-16" />
            <TheMenu />
          </div>
        </w-transition>
      </div>

      <div
        :class="[
          'hstack justify-end space-x-2 h-full',
          { 'space-x-1': appMemo.isMobile },
        ]"
        w:children="cursor-pointer flex items-center px-0.5 h-full"
      >
        <WAppFullScreen
          :isFullscreen="isFullscreen"
          :click-event="toggle"
          v-if="!appMemo.isMobile && headerSettings.showFullScreen"
        />
        <WAppLock v-if="headerSettings.showLock" />
        <WAppSearch v-if="headerSettings.showSearch" />
        <WAppLocalePicker v-if="headerSettings.showLocale" />
        <WAppDarkMode v-if="headerSettings.showDarkMode" />
        <HeaderDropdown />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderBreadCrumb from './breadcrumb.vue'
  import HeaderCollapse from './collapse.vue'
  import HeaderDropdown from './dropdown.vue'
  import TheMenu from '../../TheAside/src/menu.vue'
  import TheLogo from '../../TheAside/src/logo.vue'
  import { getShowMenuCollpaseIcon } from '/@/settings'

  const { appMemo, settings } = useAppState()
  const headerSettings = settings.value.ForDevelopers.header

  const getAppTitle = computed(() => import.meta.env.VITE_APP_TITLE)

  const { isFullscreen, toggle } = useFullscreen()
</script>
