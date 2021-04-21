<template>
  <div class="w-default-layout-aside">
    <el-aside width="auto">
      <AsideLogo />

      <AsideMenu
        :menus="menu.menus"
        :style="{ height: 'calc(100vh - 3rem)' }"
        class="h-full bg-primary text-primary"
      />
    </el-aside>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import AsideMenu from './menu.vue'
  import AsideLogo from './logo.vue'
  import { useAppContext } from '/@/App'

  export default defineComponent({
    name: 'Aside',

    components: { AsideMenu, AsideLogo },

    setup() {
      const { menu } = useAppContext()

      return {
        menu,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
