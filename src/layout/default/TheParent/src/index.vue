<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <keep-alive v-if="getOpenKeepAlive" :include="menu.keepAliveRouteNames">
          <div :id="route.name">
            <component :is="Component" v-bind="getKey(Component, route)" />
          </div>
        </keep-alive>

        <div v-else :id="route.name">
          <component :is="Component" v-bind="getKey(Component, route)" />
        </div>
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts">
  export default defineComponent({
    parentView: true,

    setup() {
      const { menu } = useAppState()
      const getOpenKeepAlive = computed(() => true)

      const getKey = (comp: VNode, route: RouteLocationNormalized) => {
        // @ts-ignore
        return comp.type.parentView ? {} : { key: route.fullPath }
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
