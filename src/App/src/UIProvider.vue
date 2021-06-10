<script lang="tsx">
  import { defineComponent } from 'vue'
  import { darkTheme } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'

  import { useAppContext } from '/@/App'

  export default defineComponent({
    name: 'UIProvider',

    setup(_, { slots }) {
      const { app } = useAppContext()

      return () => (
        <n-config-provider
          theme={!app.value.isDark ? undefined : darkTheme}
          locale={app.value.locale === 'en' ? {} : zhCN}
          date-locale={app.value.locale === 'en' ? {} : dateZhCN}
        >
          {() => slots.default?.()}
        </n-config-provider>
      )
    },
  })
</script>
