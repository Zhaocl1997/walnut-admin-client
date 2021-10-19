<template>
  <div class="w-default-layout-aside select-none">
    <AsideLogo />

    <AsideMenu :menus="menu.menus" :style="{ height: 'calc(100vh - 3rem)' }" />
  </div>
</template>

<script lang="ts">
  import AsideMenu from './menu.vue'
  import AsideLogo from './logo.vue'

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
