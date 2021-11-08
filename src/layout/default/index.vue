<template>
  <n-layout has-sider>
    <TheAside v-if="!app.isMobile && getShowAside" />

    <n-drawer
      v-else
      v-model:show="app.showAside"
      :width="settings.ForDevelopers.menu.width + 'px'"
      placement="left"
    >
      <TheAside />
    </n-drawer>

    <div
      id="w-main-layout"
      class="*vstack flex-1 h-screen w-full overflow-x-hidden"
    >
      <MainHeader v-if="setting.app.fixHeader" />

      <n-layout-content
        bordered
        :native-scrollbar="false"
        :content-style="{ height: '100%' }"
      >
        <MainHeader v-if="!setting.app.fixHeader" />

        <TheContent class="flex-1 p-4" />

        <WAppSettings />

        <n-back-top />
      </n-layout-content>
    </div>
  </n-layout>
</template>

<script lang="tsx" setup>
  import TheAside from './TheAside'
  import TheHeader from './TheHeader'
  import TheContent from './TheContent'
  import TheTab from './TheTab'
  import { getShowAside, getContentWidth } from '/@/settings'

  const { app, settings } = useAppState()
  const setting = settings.value.ForDevelopers

  const MainHeader = defineComponent({
    setup() {
      return () => (
        <div style={{ width: getContentWidth.value }}>
          {setting.app.showHeader && (
            <n-layout-header bordered inverted={setting.header.inverted}>
              <TheHeader
                class="flex-none px-2"
                style={{ height: setting.header.height + 'px' }}
              />
            </n-layout-header>
          )}

          {setting.app.showTabs && (
            <n-layout-header bordered inverted={setting.header.inverted}>
              <TheTab
                class="flex-none px-2"
                style={{ height: setting.tab.height + 'px' }}
              />
            </n-layout-header>
          )}
        </div>
      )
    },
  })
</script>
