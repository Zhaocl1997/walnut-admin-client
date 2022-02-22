<template>
  <n-layout has-sider>
    <w-transition name="slide-left">
      <TheAside v-if="getShowNormalAside" />
    </w-transition>

    <n-drawer
      v-if="!getShowNormalAside"
      v-model:show="appMemo.showAside"
      :width="settings.ForDevelopers.menu.width + 'px'"
      placement="left"
      :native-scrollbar="false"
    >
      <TheAside />
    </n-drawer>

    <div class="vstack flex-1 h-screen w-full overflow-x-hidden">
      <MainHeader v-if="setting.app.fixHeader" />

      <n-layout-content
        bordered
        :native-scrollbar="false"
        :content-style="{ height: '100%' }"
      >
        <MainHeader v-if="!setting.app.fixHeader" />

        <div
          class="flex-1 h-full"
          :style="{
            padding: $route.meta.url ? 0 : setting.app.contentPadding + 'px',
          }"
        >
          <TheContent />
        </div>

        <TheFooter v-if="setting.app.showFooter && !setting.app.fixFooter" />

        <WAppSettings />

        <n-back-top />
      </n-layout-content>

      <TheFooter v-if="setting.app.showFooter && setting.app.fixFooter" />
    </div>
  </n-layout>
</template>

<script lang="tsx" setup>
  import TheAside from './TheAside'
  import TheHeader from './TheHeader'
  import TheContent from './TheContent'
  import TheTab from './TheTab'
  import TheFooter from './TheFooter'
  import {
    getContentWidth,
    getShowNormalAside,
    toggleLeftMenuLayout,
  } from '/@/settings'

  // TODO 99
  import { NLayoutHeader } from 'naive-ui'

  const { appMemo, settings } = useAppState()
  const { currentRoute } = useAppRouter()
  const setting = settings.value.ForDevelopers

  watchEffect(() => {
    if (setting.app.layout === AppLayoutModeConst.LEFT_MENU) {
      setting.app.showLogo = true
      setting.app.showMenu = true
      setting.header.showBreadcrumb = true
    }

    if (setting.app.layout === AppLayoutModeConst.TOP_MENU) {
      setting.app.showLogo = false
      setting.app.showMenu = false
      setting.header.showBreadcrumb = false
      appMemo.value.collapse = false
    }
  })

  watchEffect(() => {
    if (currentRoute.value.query.full) {
      toggleLeftMenuLayout()
    }
  })

  const MainHeader = defineComponent({
    setup() {
      return () => (
        <div style={{ width: getContentWidth.value }}>
          {setting.app.showHeader && (
            <NLayoutHeader bordered inverted={setting.header.inverted}>
              <TheHeader
                class="flex-none px-2"
                style={{ height: setting.header.height + 'px' }}
              />
            </NLayoutHeader>
          )}

          {setting.app.showTabs && (
            <NLayoutHeader bordered inverted={setting.header.inverted}>
              <TheTab
                class="flex-none px-2"
                style={{ height: setting.tab.height + 'px' }}
              />
            </NLayoutHeader>
          )}
        </div>
      )
    },
  })
</script>
