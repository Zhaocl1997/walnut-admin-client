<template>
  <div
    ref="el"
    :style="style"
    class="fixed cursor-pointer hover:(text-primary animate-bounce)"
  >
    <w-icon
      height="32"
      icon="ant-design:setting-outlined"
      @click.stop.prevent="() => (show = true)"
      :style="{ zIndex: 9999 }"
    ></w-icon>
  </div>

  <w-drawer
    v-model:show="show"
    :width="350"
    :title="t('app:settings:title')"
    @yes="() => (show = false)"
    @no="() => (show = false)"
  >
    <w-form @hook="register0" :model="themeRelatives"></w-form>
    <w-form @hook="register1" :model="appRelatives"></w-form>
    <w-form @hook="register2" :model="menuRelatives"></w-form>
    <w-form @hook="register3" :model="headerRelatives"></w-form>
    <w-form @hook="register4" :model="breadcrumbRelatives"></w-form>
    <w-form @hook="register5" :model="tabRelatives"></w-form>
  </w-drawer>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'AppSettings',
  })
</script>

<script lang="tsx" setup>
  import WIcon from '/@/components/UI/Icon'
  import AppColors from './colors.vue'
  import { getThemeColors } from '/@/utils/color'
  import { defaultTheme } from '/@/settings/theme'

  const { app, settings } = useAppState()
  const { t } = useAppI18n()

  const el = ref(null)
  const show = ref(false)
  const myX = ref()
  const myY = ref()

  const { width, height } = useWindowSize()

  const { style, x, y } = useDraggable(el, {
    initialValue: { x: width.value - 50, y: height.value - 50 },
    preventDefault: true,
    onMove: (p) => {
      myX.value = p.x
      myY.value = p.y
    },
  })

  watchEffect(() => {
    x.value = myX.value ?? width.value - 50
    y.value = myY.value ?? height.value - 50
  })

  const themeRelatives = ref(settings.value.ForDevelopers.themes)
  const appRelatives = ref(settings.value.ForDevelopers.app)
  const menuRelatives = ref(settings.value.ForDevelopers.menu)
  const headerRelatives = ref(settings.value.ForDevelopers.header)
  const breadcrumbRelatives = ref(settings.value.ForDevelopers.breadcrumb)
  const tabRelatives = ref(settings.value.ForDevelopers.tab)

  const [register0] = useForm<typeof themeRelatives.value>({
    showFeedback: false,
    xGap: 0,
    formItemClass: 'mb-2',
    formItemComponentClass: '',
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme:primary',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'primaryColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              colors={
                getThemeColors(
                  app.value.isDark
                    ? defaultTheme.dark.primaryColor
                    : defaultTheme.light.primaryColor
                )[1]
              }
              formDataColor={formData.primaryColor}
              clickEvent={(color) => (formData.primaryColor = color)}
            />
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme:info',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'infoColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              colors={
                getThemeColors(
                  app.value.isDark
                    ? defaultTheme.dark.infoColor
                    : defaultTheme.light.infoColor
                )[1]
              }
              formDataColor={formData.infoColor}
              clickEvent={(color) => (formData.infoColor = color)}
            />
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme:success',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'successColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              colors={
                getThemeColors(
                  app.value.isDark
                    ? defaultTheme.dark.successColor
                    : defaultTheme.light.successColor
                )[1]
              }
              formDataColor={formData.successColor}
              clickEvent={(color) => (formData.successColor = color)}
            />
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme:warning',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'warningColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              colors={
                getThemeColors(
                  app.value.isDark
                    ? defaultTheme.dark.warningColor
                    : defaultTheme.light.warningColor
                )[1]
              }
              formDataColor={formData.warningColor}
              clickEvent={(color) => (formData.warningColor = color)}
            />
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme:error',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'errorColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              colors={
                getThemeColors(
                  app.value.isDark
                    ? defaultTheme.dark.errorColor
                    : defaultTheme.light.errorColor
                )[1]
              }
              formDataColor={formData.errorColor}
              clickEvent={(color) => (formData.errorColor = color)}
            />
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme:body',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'bodyColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              colors={
                getThemeColors(
                  app.value.isDark
                    ? defaultTheme.dark.bodyColor
                    : defaultTheme.light.bodyColor,
                  4
                )[1]
              }
              formDataColor={formData.bodyColor}
              clickEvent={(color) => (formData.bodyColor = color)}
            />
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:theme:inverted',
          titlePlacement: 'center',
          helpMessage: true,
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'invertedColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              colors={
                getThemeColors(
                  app.value.isDark
                    ? defaultTheme.dark.invertedColor
                    : defaultTheme.light.invertedColor,
                  4
                )[1]
              }
              formDataColor={formData.invertedColor}
              clickEvent={(color) => (formData.invertedColor = color)}
            />
          ),
        },
      },
    ],
  })

  const [register1] = useForm<typeof appRelatives.value>({
    localeUniqueKey: 'app:app',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: 'w-32 flex justify-end',
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:app',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showLogo',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showMenu',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showHeader',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showTabs',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showFooter',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'fixLogo',
        },
        componentProp: {
          disabled: computed(() => !appRelatives.value.showLogo),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'fixHeader',
        },
        componentProp: {
          disabled: computed(() => !appRelatives.value.showHeader),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'fixFooter',
        },
        componentProp: {
          disabled: computed(() => !appRelatives.value.showFooter),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showAnimation',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'animationName',
        },
        componentProp: {
          disabled: computed(() => !appRelatives.value.showAnimation),
          options: Object.values(TransitionNameConst).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'keepAlive',
        },
      },
    ],
  })

  const [register2] = useForm<typeof menuRelatives.value>({
    localeUniqueKey: 'app:menu',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: 'w-32 flex justify-end',
    size: 'small',
    disabled: computed(() => !appRelatives.value.showMenu),
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:menu',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showCollapse',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'collapseMode',
        },
        componentProp: {
          options: Object.values(MenuCollapseModeConst).map((i) => ({
            value: i,
            label: i,
          })),
          disabled: computed(
            () =>
              !appRelatives.value.showMenu || !menuRelatives.value.showCollapse
          ),
        },
      },

      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'width',
        },
        componentProp: {
          step: 10,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'collapsedWidth',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'accordion',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'iconSize',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'collapsedIconSize',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'indent',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'inverted',
        },
      },
    ],
  })

  const [register3] = useForm<typeof headerRelatives.value>({
    localeUniqueKey: 'app:header',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: 'w-32 flex justify-end',
    size: 'small',
    disabled: computed(() => !appRelatives.value.showHeader),
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:header',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'height',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showBreadcrumb',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showFullScreen',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showLocale',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showDarkMode',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showLock',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showSearch',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'inverted',
        },
      },
    ],
  })

  const [register4] = useForm<typeof breadcrumbRelatives.value>({
    localeUniqueKey: 'app:bc',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: 'w-32 flex justify-end',
    size: 'small',
    disabled: computed(
      () =>
        !appRelatives.value.showHeader || !headerRelatives.value.showBreadcrumb
    ),
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:breadcrumb',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showIcon',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showDropdown',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'separator',
        },
        componentProp: {
          options: ['>', '/'].map((i) => ({ value: i, label: i })),
        },
      },
    ],
  })

  const [register5] = useForm<typeof tabRelatives.value>({
    localeUniqueKey: 'app:tab',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: 'w-32 flex justify-end',
    size: 'small',
    disabled: computed(() => !appRelatives.value.showTabs),
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app:settings:tab',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'height',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showIcon',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showUtils',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'contextMenu',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'sortable',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'devtool',
          labelHelpMessage: true,
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'styleMode',
        },
        componentProp: {
          options: Object.values(TabStyleModeConst).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },
    ],
  })
</script>
