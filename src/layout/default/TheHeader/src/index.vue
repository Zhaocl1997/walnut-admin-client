<template>
  <div class="w-default-layout-header">
    <el-header height="100%">
      <div
        class="flex flex-nowrap flex-row justify-between h-full items-center"
      >
        <div class="flex flex-nowrap flex-row justify-start space-x-2">
          <HeaderCollapse />
          <HeaderBreadCrumb v-if="!app.isMobile" />
        </div>

        <div
          class="flex flex-nowrap flex-row justify-end space-x-2 h-full children:cursor-pointer children:flex children:items-center"
        >
          <div class="hover:bg-warm-gray-300 px-0.5">
            <WAppFullScreen v-if="!app.isMobile" />
          </div>

          <div class="hover:bg-warm-gray-300 px-0.5">
            <WAppLocalePicker />
          </div>

          <div class="hover:bg-warm-gray-300 px-0.5">
            <WAppDarkMode />
          </div>

          <div class="hover:bg-warm-gray-300 px-0.5">
            <HeaderAvatar />
          </div>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import HeaderBreadCrumb from './breadcrumb.vue'
  import HeaderCollapse from './collapse.vue'
  import HeaderAvatar from './avatar.vue'
  import { useAppContext } from '/@/App'

  export default defineComponent({
    name: 'Header',

    components: {
      HeaderBreadCrumb,
      HeaderCollapse,
      HeaderAvatar,
    },

    setup() {
      const { app } = useAppContext()

      return {
        app,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
