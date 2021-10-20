<template>
  <n-layout has-sider>
    <!-- <div class="flex h-screen"> -->

    <TheAside
      v-if="!app.isMobile"
      :class="['h-screen w-56 ', { 'w-16': app.collapse }]"
    />

    <n-drawer v-else v-model:show="app.showAside" width="60%" placement="left">
      <TheAside :class="['h-screen w-56 ', { 'w-16': app.collapse }]" />
    </n-drawer>

    <div
      id="w-main-layout"
      class="*vstack flex-1 h-screen w-full overflow-x-hidden overflow-y-auto"
    >
      <div
        class="fixed"
        :style="{
          width: app.isMobile
            ? '100vw'
            : app.collapse
            ? 'calc(100vw - 60px)'
            : 'calc(100vw - 240px)',
          zIndex: 1,
        }"
      >
        <n-layout-header bordered inverted>
          <TheHeader class="flex-none h-12 px-2" />
        </n-layout-header>

        <n-layout-header bordered inverted>
          <TheTab class="flex-none h-8 px-2" />
        </n-layout-header>
      </div>

      <n-layout-content bordered>
        <TheContent class="flex-1 p-4 mt-20" />
      </n-layout-content>
    </div>

    <!-- <el-backtop target="#w-main-layout" /> -->
    <!-- </div> -->
  </n-layout>
</template>

<script lang="ts" setup>
  import TheAside from './TheAside'
  import TheHeader from './TheHeader'
  import TheContent from './TheContent'
  import TheTab from './TheTab'

  import { useAppResize } from '/@/App'

  const { app } = useAppResize()
</script>
