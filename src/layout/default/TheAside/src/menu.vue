<template>
  <div class="select-none">
    <w-scrollbar>
      <el-menu
        :default-active="$route.name"
        :collapse="getCollapse"
        :collapse-transition="false"
        unique-opened
        background-color="var(--color-bg-primary)"
        text-color="var(--color-text-primary)"
        style="border-right: 0;"
      >
        <AsideMenuItem
          v-for="item in menus"
          :key="item.path"
          :index="item.name"
          :item="item"
        ></AsideMenuItem>
      </el-menu>
    </w-scrollbar>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import type { Menu } from '/@/router/types'
  import { defineComponent, computed } from 'vue'

  import { useAppStore } from '/@/store'
  import AsideMenuItem from './menuItem.vue'

  export default defineComponent({
    name: 'AsideMenu',

    components: { AsideMenuItem },

    props: {
      menus: {
        type: Array as PropType<Menu[]>,
        required: true,
      },
    },

    setup() {
      const { getters } = useAppStore()

      const getCollapse = computed(() => getters.collapse)

      return {
        getCollapse,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
