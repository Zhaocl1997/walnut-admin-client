<template>
  <div>
    <n-config-provider
      :theme="!app.isDark ? {} : darkTheme"
      :locale="app.locale === 'en' ? {} : zhCN"
      :date-locale="app.locale === 'en' ? {} : dateZhCN"
      :theme-overrides="themeOverrides"
    >
      <n-button type="primary">naive-ui</n-button>
      <n-select v-model:value="value" :options="options" />
      <n-color-picker v-model:value="color" />
    </n-config-provider>
  </div>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { GlobalThemeOverrides } from 'naive-ui'
  import { defineComponent, ref, computed } from 'vue'
  import { darkTheme } from 'naive-ui'
  import { options } from '../demo/data'
  import { zhCN, dateZhCN } from 'naive-ui'
  import { useAppContext } from '/@/App'

  export default defineComponent({
    name: 'Index',

    inheritAttrs: false,

    defaultView: false,

    components: {},

    props: {},

    emits: [],

    setup(props: any, ctx: SetupContext) {
      const { app } = useAppContext()

      const value = ref()
      const color = ref()

      const themeOverrides = computed(
        (): GlobalThemeOverrides => {
          return {
            common: {
              primaryColor: color.value,
            },
          }
        }
      )

      return {
        app,
        value,
        color,
        darkTheme,
        options,
        zhCN,
        dateZhCN,
        themeOverrides,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
