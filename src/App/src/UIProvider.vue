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
      const customThemes = settings.value.ForDevelopers.themes

      const getTheme = computed(() =>
        !app.value.isDark ? undefined : darkTheme
      )

      const sharedTheme = computed(
        (): Partial<ThemeCommonVars> => ({
          primaryColor: customThemes.primaryColor,
          primaryColorHover: adjustColor(customThemes.primaryColor, 40),
          primaryColorPressed: adjustColor(customThemes.primaryColor, 20),
          primaryColorSuppl: adjustColor(customThemes.primaryColor, -20),
          infoColor: customThemes.infoColor,
          infoColorHover: adjustColor(customThemes.infoColor, 40),
          infoColorPressed: adjustColor(customThemes.infoColor, 20),
          infoColorSuppl: adjustColor(customThemes.infoColor, -20),
          successColor: customThemes.successColor,
          successColorHover: adjustColor(customThemes.successColor, 40),
          successColorPressed: adjustColor(customThemes.successColor, 20),
          successColorSuppl: adjustColor(customThemes.successColor, -20),
          warningColor: customThemes.warningColor,
          warningColorHover: adjustColor(customThemes.warningColor, 40),
          warningColorPressed: adjustColor(customThemes.warningColor, 20),
          warningColorSuppl: adjustColor(customThemes.warningColor, -20),
          errorColor: customThemes.errorColor,
          errorColorHover: adjustColor(customThemes.errorColor, 40),
          errorColorPressed: adjustColor(customThemes.errorColor, 20),
          errorColorSuppl: adjustColor(customThemes.errorColor, -20),

          bodyColor: customThemes.bodyColor,
          invertedColor: customThemes.invertedColor,
        })
      )

      const getThemeOverrides = computed(
        (): GlobalThemeOverrides =>
          !app.value.isDark
            ? // light
              {
                common: {
                  ...sharedTheme.value,
                },
              }
            : // dark
              {
                common: {
                  ...sharedTheme.value,
                },
              }
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
