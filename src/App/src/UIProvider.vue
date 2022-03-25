<script lang="tsx">
  import type { GlobalThemeOverrides } from 'naive-ui'
  import { zhCN, enUS, dateZhCN } from 'naive-ui'
  import { getCommonTheme, getTheme } from './naive'

  export default defineComponent({
    name: 'UIProvider',

    setup(_, { slots }) {
      const { app } = useAppState()

      const getThemeOverrides = computed(
        (): GlobalThemeOverrides => ({
          common: {
            ...getCommonTheme.value,
          },

          // change some default style
          Dialog: {
            contentMargin: '8px 0',
          },
        })
      )

      return () => (
        <n-config-provider
          theme={getTheme.value}
          theme-overrides={getThemeOverrides.value}
          locale={app.value.locale === LocaleConst.EN_US ? {} : zhCN}
          date-locale={app.value.locale === LocaleConst.EN_US ? {} : dateZhCN}
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
