<!-- This file will trigger hmr error. Nested keep alive not working -->

<template>
  <router-view>
    <template #="{ Component, route }">
      <RenderWrapper :parent="Component.type.parentView" :div-id="route.name">
        <component :is="Component" v-bind="getKey(Component, route)" />
      </RenderWrapper>
    </template>
  </router-view>
</template>

<script lang="tsx" setup>
  import { KeepAlive } from 'vue'

  const { menu, settings } = useAppState()
  const appSettings = settings.value.ForDevelopers.app

  const getKey = (comp: MyVNode, route: RouteLocationNormalized) => {
    return comp.type.parentView ? {} : { key: route.fullPath }
  }

  const RenderKeepAlive = defineComponent({
    setup(_, { slots }) {
      console.log(9)

      return () =>
        appSettings.keepAlive ? (
          <KeepAlive include={menu.value.keepAliveRouteNames}>
            {{ default: () => slots.default!() }}
          </KeepAlive>
        ) : (
          <div>{{ default: () => slots.default!() }}</div>
        )
    },
  })

  const RenderWrapper = defineComponent({
    props: {
      divId: String as PropType<string>,
      parent: Boolean as PropType<boolean>,
    },
    setup(props, { slots }) {
      console.log(props.parent)

      const RenderWrappedDiv = (render: Fn) =>
        props.parent ? (
          render()
        ) : (
          <div id={props.divId} class="h-full">
            {render()}
          </div>
        )

      return () =>
        RenderWrappedDiv(() =>
          appSettings.showAnimation ? (
            <w-transition name={appSettings.animationName} appear>
              <RenderKeepAlive>
                {{ default: () => slots.default!() }}
              </RenderKeepAlive>
            </w-transition>
          ) : (
            <RenderKeepAlive>
              {{ default: () => slots.default!() }}
            </RenderKeepAlive>
          )
        )
    },
  })
</script>
