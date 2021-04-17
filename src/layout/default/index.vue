<template>
  <div class="flex h-screen">
    <TheAside
      :class="[
        'bg-gray-100 h-screen overflow-y-auto w-56 transition-width duration-500 ease-in-out',
        { 'w-16': getCollapse },
      ]"
    />

    <div
      id="w-main-layout"
      class="flex flex-col flex-1 h-screen flex-nowrap w-full overflow-x-hidden overflow-y-auto"
    >
      <div
        class="fixed transition-width duration-500 ease-in-out"
        :style="{
          width: getCollapse ? 'calc(100vw - 4rem)' : 'calc(100vw - 14rem)',
          zIndex: 1,
        }"
      >
        <TheHeader class="bg-primary flex-none h-12" />

        <TheTab class="bg-secondary flex-none h-8 px-2" />
      </div>

      <TheContent class="bg-primary flex-1 p-4 mt-20" />
    </div>

    <el-backtop target="#w-main-layout" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  import TheAside from './TheAside'
  import TheHeader from './TheHeader'
  import TheContent from './TheContent'
  import TheTab from './TheTab'

  import { useAppStore } from '/@/store'
  import { useLayoutResize } from '../../hooks/core/useLayoutResize'

  export default defineComponent({
    name: 'DefaultLayout',

    components: {
      TheAside,
      TheHeader,
      TheContent,
      TheTab,
    },

    setup() {
      useLayoutResize()

      const { getters } = useAppStore()

      const getCollapse = computed(() => getters.collapse)

      return {
        getCollapse,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
