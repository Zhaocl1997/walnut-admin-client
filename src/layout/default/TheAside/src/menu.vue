<template>
  <div class="select-none">
    <!-- <w-scrollbar>
      <el-menu
        :default-active="$route.name"
        :collapse="app.collapse"
        :collapse-transition="false"
        unique-opened
        background-color="var(--color-bg-primary)"
        text-color="var(--color-text-primary)"
        style="border-right: 0"
      >
        <AsideMenuItem
          v-for="item in menus"
          :key="item.path"
          :index="item.name"
          :item="item"
        ></AsideMenuItem>
      </el-menu>
    </w-scrollbar> -->
    <n-menu
      :indent="15"
      :options="newMenus"
      :collapsed="app.collapse"
      :value="$route.name"
      :default-expanded-keys="defaultExpandedKeys"
    />
  </div>
</template>

<script lang="tsx">
  import type { PropType } from 'vue'
  import type { Menu } from '/@/router/types'
  import { defineComponent } from 'vue'

  import AsideMenuItem from './menuItem.vue'
  import { useAppContext } from '/@/App'
  import { findPath, formatTree } from 'easy-fns-ts'
  import { useI18n } from '/@/locales'
  import { useAppRouter } from '/@/router'

  export default defineComponent({
    name: 'AsideMenu',

    components: { AsideMenuItem },

    props: {
      menus: {
        type: Array as PropType<Menu[]>,
        required: true,
      },
    },

    setup(props) {
      const router = useAppRouter()
      const { app } = useAppContext()
      const { t } = useI18n()

      const newMenus = formatTree(props.menus, {
        format: (node) => {
          return {
            label: t(node.title),
            key: node.name,
            icon: () => <w-icon icon={node.icon}></w-icon>,
          }
        },
      })

      const paths = findPath(
        props.menus,
        (node) => node.name == router.currentRoute.value.name,
        { id: '_id' }
      )

      paths!.pop()

      const defaultExpandedKeys = paths!.map((i) => i.name)

      console.log(defaultExpandedKeys)

      return {
        app,
        newMenus,
        defaultExpandedKeys,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
