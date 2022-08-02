<template>
  <div class="select-none">
    <div class="hstack justify-between h-full items-center">
      <div class="hstack items-center justify-between space-x-2">
        <img
          v-if="appAdapter.isMobile"
          src="/assets/logo.png"
          :alt="`${getAppTitle} Logo`"
          class="h-9 w-9 m-1"
          @click="onShowAside"
        />

        <template v-else>
          <HeaderCollapse v-if="appSetting.getShowMenuCollapseIcon" />

          <w-transition name="slide-left">
            <HeaderBreadCrumb
              v-if="appSetting.settings.header.showBreadcrumb"
            />
          </w-transition>
        </template>

        <w-transition name="slide-up">
          <div
            v-if="appSetting.settings.app.layout === 'top-menu'"
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
          { 'space-x-1': appAdapter.isMobile },
        ]"
        w:children="cursor-pointer flex items-center px-0.5 h-full"
      >
        <WAppFullScreen
          :isFullscreen="isFullscreen"
          :click-event="toggle"
          v-if="
            !appAdapter.isMobile && appSetting.settings.header.showFullScreen
          "
        />
        <WAppLock v-if="appSetting.settings.header.showLock" />
        <WAppSearch v-if="appSetting.settings.header.showSearch" />
        <WAppLocalePicker v-if="appSetting.settings.header.showLocale" />
        <WAppDarkMode v-if="appSetting.settings.header.showDarkMode" />
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

  const appSetting = useAppStoreSetting()
  const appAdapter = useAppStoreAdapter()
  const appMenu = useAppStoreMenu()

  const getAppTitle = computed(() => import.meta.env.VITE_APP_TITLE)

  const { isFullscreen, toggle } = useFullscreen()

  const onShowAside = () => {
    appMenu.setShowAside(true)
  }
</script>
