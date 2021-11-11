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
  import { genString } from 'easy-fns-ts'

  const { menu, settings } = useAppState()
  const appSettings = settings.value.ForDevelopers.app

  const getKey = (comp: MyVNode, route: RouteLocationNormalized) => {
    // TODO key should be path or name, but in dev, for pages under two paths, will cause below error.
    // So I just use random string as key, do not know if it's cool to do so
    // https://github.com/vuejs/vue-next/issues/1865
    return comp.type.parentView ? {} : { key: genString(8) }
  }

  const RenderKeepAlive = defineComponent({
    setup(_, { slots }) {
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
              <RenderKeepAlive v-slots={slots}></RenderKeepAlive>
            </w-transition>
          ) : (
            <RenderKeepAlive v-slots={slots}></RenderKeepAlive>
          )
        )
    },
  })
</script>
