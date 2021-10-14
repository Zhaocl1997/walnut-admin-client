<template>
  <div class="flex h-screen">
    <TheAside
      v-if="!app.isMobile"
      :class="[
        'h-screen w-56 transition-width duration-500 ease-in-out',
        { 'w-16': app.collapse },
      ]"
    />

    <n-drawer v-else v-model:show="app.showAside" width="60%" placement="left">
      <TheAside
        :class="[
          'h-screen w-56 transition-width duration-500 ease-in-out',
          { 'w-16': app.collapse },
        ]"
      />
    </n-drawer>

    <div
      id="w-main-layout"
      class="
        flex flex-col flex-1
        h-screen
        flex-nowrap
        w-full
        overflow-x-hidden overflow-y-auto
      "
    >
      <div
        class="fixed transition-width duration-500 ease-in-out"
        :style="{
          width: app.isMobile
            ? '100vw'
            : app.collapse
            ? 'calc(100vw - 4rem)'
            : 'calc(100vw - 14rem)',
          zIndex: 1,
        }"
      >
        <TheHeader class="bg-primary flex-none h-12" />

        <TheTab class="bg-secondary flex-none h-8 px-2" />
      </div>

      <TheContent class="bg-primary flex-1 p-4 mt-20" />
    </div>

    <!-- <el-backtop target="#w-main-layout" /> -->
  </div>
</template>

<script lang="ts">
  import TheAside from './TheAside'
  import TheHeader from './TheHeader'
  import TheContent from './TheContent'
  import TheTab from './TheTab'

  import { useAppResize } from '/@/App'

  export default defineComponent({
    name: 'DefaultLayout',

    components: {
      TheAside,
      TheHeader,
      TheContent,
      TheTab,
    },

    setup() {
      const { app } = useAppResize()

      return {
        app,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
