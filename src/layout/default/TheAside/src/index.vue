<template>
  <div class="w-default-layout-aside">
    <el-aside width="auto">
      <AsideLogo />

      <AsideMenu
        :menus="getMenus"
        :style="{ height: 'calc(100vh - 3rem)' }"
        class="h-full bg-primary text-primary"
      />
    </el-aside>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useAppStore } from '/@/store'

  import AsideMenu from './menu.vue'
  import AsideLogo from './logo.vue'

  export default defineComponent({
    name: 'Aside',

    components: { AsideMenu, AsideLogo },

    setup() {
      const { getters } = useAppStore()
      const getMenus = computed(() => getters.menus)

      return {
        getMenus,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
