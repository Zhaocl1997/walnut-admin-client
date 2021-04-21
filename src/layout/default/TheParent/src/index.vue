<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <keep-alive v-if="getOpenKeepAlive" :include="menu.keepAliveRouteNames">
          <component :is="Component" v-bind="getKey(Component, route)" />
        </keep-alive>
        <component :is="Component" v-else v-bind="getKey(Component, route)" />
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts">
  import type { VNode } from 'vue'
  import type { RouteLocationNormalized } from 'vue-router'
  import { defineComponent, computed } from 'vue'
  import { useAppContext } from '/@/App'

  export default defineComponent({
    parentView: true,

    setup() {
      const { menu } = useAppContext()
      const getOpenKeepAlive = computed(() => true)

      const getKey = (comp: VNode, route: RouteLocationNormalized) => {
        // @ts-ignore
        return comp.type.parentView
          ? {}
          : // use name as page id to screen full
            { key: route.fullPath, id: route.name }
      }

      return {
        menu,
        getOpenKeepAlive,
        getKey,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
