<script lang="tsx">
  import { darkTheme } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'

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
          <n-loading-bar-provider>
            <n-dialog-provider>
              <n-notification-provider>
                <n-message-provider>
                  {() => slots.default?.()}
                </n-message-provider>
              </n-notification-provider>
            </n-dialog-provider>
          </n-loading-bar-provider>
        </n-config-provider>
      )
    },
  })
</script>
