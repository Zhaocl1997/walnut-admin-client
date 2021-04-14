<template>
  <div class="w-default-layout-header">
    <el-header height="100%">
      <div
        class="flex flex-nowrap flex-row justify-between h-full items-center"
      >
        <div class="flex flex-nowrap flex-row justify-start space-x-2">
          <HeaderCollapse />
          <HeaderBreadCrumb />
        </div>

        <div
          class="flex flex-nowrap flex-row justify-end space-x-2 h-full all-child:cursor-pointer all-child:flex all-child:items-center"
        >
          <div class="hover:bg-warm-gray-300 px-0.5">
            <HeaderScreenfull />
          </div>

          <div class="hover:bg-warm-gray-300 px-0.5">
            <HeaderLocale />
          </div>

          <div class="hover:bg-warm-gray-300 px-0.5">
            <HeaderDarkMode />
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
  import type { SetupContext } from 'vue'
  import { defineComponent } from 'vue'

  import HeaderBreadCrumb from './breadcrumb.vue'
  import HeaderCollapse from './collapse.vue'
  import HeaderAvatar from './avatar.vue'
  import HeaderLocale from '../../../../components/App/AppLocalePicker'
  import HeaderScreenfull from '/@/components/Help/Screenfull'
  import HeaderDarkMode from '../../../../components/App/AppDarkMode'

  export default defineComponent({
    name: 'Header',

    components: {
      HeaderBreadCrumb,
      HeaderCollapse,
      HeaderAvatar,
      HeaderLocale,
      HeaderScreenfull,
      HeaderDarkMode,
    },

    setup(props: any, ctx: SetupContext) {},
  })
</script>

<style lang="scss" scoped></style>
