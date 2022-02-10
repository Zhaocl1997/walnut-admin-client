<script lang="tsx">
  import type { ThemeCommonVars } from 'naive-ui/lib/_styles/common'
  import type { GlobalThemeOverrides } from 'naive-ui'
  import { darkTheme } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'
  import { adjustColor } from '/@/utils/color'

  export default defineComponent({
    name: 'UIProvider',

    setup(_, { slots }) {
      const { app, settings } = useAppState()

      const getTheme = computed(() =>
        !app.value.isDark ? undefined : darkTheme
      )

      const getCustomTheme = computed(() =>
        app.value.isDark
          ? settings.value.ForDevelopers.themes.dark
          : settings.value.ForDevelopers.themes.light
      )

      const getCommonTheme = computed(
        (): Partial<ThemeCommonVars> => ({
          primaryColor: getCustomTheme.value.primaryColor,
          primaryColorHover: adjustColor(getCustomTheme.value.primaryColor, 40),
          primaryColorPressed: adjustColor(
            getCustomTheme.value.primaryColor,
            20
          ),
          primaryColorSuppl: adjustColor(
            getCustomTheme.value.primaryColor,
            -20
          ),
          infoColor: getCustomTheme.value.infoColor,
          infoColorHover: adjustColor(getCustomTheme.value.infoColor, 40),
          infoColorPressed: adjustColor(getCustomTheme.value.infoColor, 20),
          infoColorSuppl: adjustColor(getCustomTheme.value.infoColor, -20),
          successColor: getCustomTheme.value.successColor,
          successColorHover: adjustColor(getCustomTheme.value.successColor, 40),
          successColorPressed: adjustColor(
            getCustomTheme.value.successColor,
            20
          ),
          successColorSuppl: adjustColor(
            getCustomTheme.value.successColor,
            -20
          ),
          warningColor: getCustomTheme.value.warningColor,
          warningColorHover: adjustColor(getCustomTheme.value.warningColor, 40),
          warningColorPressed: adjustColor(
            getCustomTheme.value.warningColor,
            20
          ),
          warningColorSuppl: adjustColor(
            getCustomTheme.value.warningColor,
            -20
          ),
          errorColor: getCustomTheme.value.errorColor,
          errorColorHover: adjustColor(getCustomTheme.value.errorColor, 40),
          errorColorPressed: adjustColor(getCustomTheme.value.errorColor, 20),
          errorColorSuppl: adjustColor(getCustomTheme.value.errorColor, -20),

          bodyColor: getCustomTheme.value.bodyColor,
          invertedColor: getCustomTheme.value.invertedColor,
        })
      )

      const getThemeOverrides = computed(
        (): GlobalThemeOverrides => ({
          common: {
            ...getCommonTheme.value,
          },
        })
      )

      return () => (
        <n-config-provider
          theme={getTheme.value}
          theme-overrides={getThemeOverrides.value}
          locale={app.value.locale === 'en-US' ? {} : zhCN}
          date-locale={app.value.locale === 'en-US' ? {} : dateZhCN}
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
