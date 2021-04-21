<template>
  <el-submenu v-if="hasChildren" :key="item.path" :index="item.name">
    <template #title>
      <div class="flex flex-row flex-nowrap h-full">
        <w-icon
          class="mr-0.5 my-auto flex-none"
          :icon="item.icon"
          height="20"
        ></w-icon>

        <span>{{ getMaybeI18nMsg(item.title) }}</span>
      </div>
    </template>

    <el-menu-item-group>
      <AsideMenuItem
        v-for="item in childrenLists"
        :key="item.path"
        :index="item.name"
        :item="item"
      ></AsideMenuItem>
    </el-menu-item-group>
  </el-submenu>

  <el-menu-item
    v-else
    :key="item.path"
    :index="item.name"
    @click="onClick(item)"
  >
    <template #title>
      <div class="flex flex-row flex-nowrap h-full">
        <w-icon
          class="mr-0.5 my-auto flex-none"
          :icon="item.icon"
          height="20"
        ></w-icon>

        <span>{{ getMaybeI18nMsg(item.title) }}</span>
      </div>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import type { Menu } from '/@/router/types'

  import { computed, defineComponent } from 'vue'

  import { useRouterPush } from '/@/router'
  import { getMaybeI18nMsg } from '/@/views/system/menu/utils'
  import { getAppContext } from '/@/App'

  interface MenuItem extends Menu {
    children?: any[]
  }

  export default defineComponent({
    name: 'AsideMenuItem',

    props: {
      item: {
        type: Object as PropType<MenuItem>,
        default: () => ({}),
      },
    },

    setup(props) {
      const { app } = getAppContext()
      const hasChildren = computed(() => {
        return props.item.children && props.item.children.length > 0
      })

      const childrenLists = computed(() => {
        return props.item.children
      })

      const onClick = (item: Menu) => {
        // If isMobile and showAside true, set showAside to false to close drawer
        if (app.value.isMobile && app.value.showAside) {
          app.value.showAside = false
        }

        // If external, open new tab and go
        if (item.external) {
          window.open(item.url, '_blank')
        } else {
          useRouterPush({ name: item.name })
        }
      }

      return {
        hasChildren,
        childrenLists,
        onClick,
        getMaybeI18nMsg,
      }
    },
  })
</script>

<style lang="scss" scoped>
  :deep(.el-menu-item-group__title) {
    padding: 0;
  }
</style>
