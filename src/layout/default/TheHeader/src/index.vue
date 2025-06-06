<script lang="ts" setup>
import HeaderBreadCrumb from './breadcrumb.vue'
import HeaderCollapse from './collapse.vue'
import HeaderDropdown from './dropdown.vue'

const appSetting = useAppStoreSetting()
const appAdapter = useAppStoreAdapter()
const appMenu = useAppStoreMenu()

const { title: AppTitle } = useAppEnv('title')

const { isFullscreen, toggle } = useFullscreen()

function onShowAside() {
  appMenu.setShowAside(true)
}
</script>

<template>
  <WTransition appear :transition-name="appSetting.getHeaderTransition">
    <n-layout-header
      v-if="appSetting.getHeaderShow"
      :id="appSetting.getHeaderId"
      bordered
      :inverted="appSetting.getHeaderInverted"
      :style="{
        zIndex: 999,
        height: `${appSetting.header.height}px`,
      }"
    >
      <div
        class="h-full h-full hstack select-none items-center justify-between px-2"
      >
        <!-- left -->
        <div class="hstack items-center justify-between space-x-2">
          <img
            v-if="appAdapter.isMobile"
            src="/assets/logo.png"
            :alt="`${AppTitle} Logo`"
            class="m-1 h-9 w-9"
            @click="onShowAside"
          >

          <template v-else>
            <HeaderCollapse />

            <HeaderBreadCrumb />
          </template>

          <!-- <WTransition transition-name="slide-up">
              <div
                v-if="appSetting.app.layout === 'top-menu'"
                class="hstack items-center justify-between"
              >
                <TheLogo class="mr-16"></TheLogo>
                <TheMenu></TheMenu>
              </div>
            </WTransition> -->
        </div>

        <!-- right -->
        <div
          class="h-full hstack justify-end space-x-2" :class="[
            { 'space-x-1': appAdapter.isMobile },
          ]"
          w:children="cursor-pointer flex items-center px-0.5 h-full"
        >
          <WAppFullScreen
            v-if="!appAdapter.isMobile && appSetting.header.fullscreen"
            id="walnut-fullscreen"
            :is-fullscreen="isFullscreen"
            :click-event="toggle"
          />

          <WAppLock v-if="appSetting.getLockStatus" id="walnut-lock" />

          <WAppSearch
            v-if="appSetting.header.search"
            id="walnut-search"
          />

          <WAppLocalePicker id="walnut-locale" />

          <WAppDarkMode id="walnut-dark" />

          <HeaderDropdown />
        </div>
      </div>
    </n-layout-header>
  </WTransition>
</template>
