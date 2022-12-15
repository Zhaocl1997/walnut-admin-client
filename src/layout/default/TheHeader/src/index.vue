<script lang="ts" setup>
import TheMenu from '../../TheAside/src/menu.vue'
import TheLogo from '../../TheAside/src/logo.vue'
import HeaderBreadCrumb from './breadcrumb.vue'
import HeaderCollapse from './collapse.vue'
import HeaderDropdown from './dropdown.vue'

const appSetting = useAppStoreSetting()
const appAdapter = useAppStoreAdapter()
const appMenu = useAppStoreMenu()

const { title: AppTitle } = useAppEnv('title')

const { isFullscreen, toggle } = useFullscreen()

const onShowAside = () => {
  appMenu.setShowAside(true)
}
</script>

<template>
  <w-transition appear :name="appSetting.getHeaderTransition">
    <n-layout-header
      v-if="appSetting.getHeaderShow"
      :id="appSetting.getHeaderId"
      bordered
      :inverted="appSetting.getHeaderInverted"
      :style="{
        zIndex: 999,
        height: `${appSetting.header.height}px`,
      }"
      :class="{ 'top-0': appSetting.getHeaderFixed }"
      class="flex-none sticky left-0"
    >
      <div
        class="h-full select-none px-2 hstack justify-between h-full items-center"
      >
        <!-- left -->
        <div class="hstack items-center justify-between space-x-2">
          <img
            v-if="appAdapter.isMobile"
            src="/assets/logo.png"
            :alt="`${AppTitle} Logo`"
            class="h-9 w-9 m-1"
            @click="onShowAside"
          >

          <template v-else>
            <HeaderCollapse />

            <HeaderBreadCrumb />
          </template>

          <!-- <w-transition name="slide-up">
              <div
                v-if="appSetting.app.layout === 'top-menu'"
                class="hstack items-center justify-between"
              >
                <TheLogo class="mr-16"></TheLogo>
                <TheMenu></TheMenu>
              </div>
            </w-transition> -->
        </div>

        <!-- right -->
        <div
          class="hstack justify-end space-x-2 h-full" :class="[
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
  </w-transition>
</template>
