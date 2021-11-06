<template>
  <router-view>
    <template #="{ Component, route }">
      <RenderWrapper>
        <component :is="Component" v-bind="getKey(Component, route)" />
      </RenderWrapper>
    </template>
  </router-view>
</template>

<script lang="tsx">
  export default defineComponent({
    parentView: true,
  })
</script>

<script lang="tsx" setup>
  import { KeepAlive } from 'vue'

  const { menu, settings } = useAppState()
  const appSettings = settings.value.ForDevelopers.app

  const getKey = (comp: VNode, route: RouteLocationNormalized) => {
    // @ts-ignore
    return comp.type.parentView ? {} : { key: route.fullPath }
  }

  const RenderKeepAlive = defineComponent({
    setup(_, { slots }) {
      return () =>
        appSettings.keepAlive ? (
          <KeepAlive include={menu.value.keepAliveRouteNames}>
            {{ default: () => slots.default!() }}
          </KeepAlive>
        ) : (
          // TODO this div cause transition not working
          <div>{{ default: () => slots.default!() }}</div>
        )
    },
  })

  const RenderWrapper = defineComponent({
    setup(_, { slots }) {
      return () =>
        appSettings.showAnimation ? (
          <w-transition name={appSettings.animationName}>
            <RenderKeepAlive v-slots={slots}></RenderKeepAlive>
          </w-transition>
        ) : (
          <RenderKeepAlive v-slots={slots}></RenderKeepAlive>
        )
    },
  })
</script>
