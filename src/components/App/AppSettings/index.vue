<template>
  <div ref="el" :style="style" class="fixed cursor-pointer hover:text-primary">
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
    <w-form
      @hook="register0"
      :model="appDark.isDark ? darkThemeRelatives : lightThemeRelatives"
    ></w-form>
    <w-form @hook="register1" :model="appRelatives"></w-form>
    <w-form @hook="register2" :model="menuRelatives"></w-form>
    <w-form @hook="register3" :model="headerRelatives"></w-form>
    <w-form @hook="register4" :model="breadcrumbRelatives"></w-form>
    <w-form @hook="register5" :model="tabRelatives"></w-form>

    <n-button
      type="primary"
      class="w-full"
      @click="onCopy"
      icon-placement="right"
    >
      {{ copied ? t('form:app:app:copy:success') : t('form:app:app:copy') }}
      <template v-if="copied" #icon>
        <w-message :msg="t('form:app:app:copy:helpMsg')"></w-message>
      </template>
    </n-button>
  </w-drawer>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'AppSettings',
  })
</script>

<script lang="tsx" setup>
  // TODO 99
  import WIcon from '/@/components/UI/Icon'
  import AppColors from './component/colors'
  import { getMergedTheme } from '/@/App/src/naive/src/theme'

  const appDark = useAppDarkStore()
  const appMenu = useAppMenuStore()
  const appSetting = useAppSettingStore()

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

  const lightThemeRelatives = ref(appSetting.settings.themes.light)
  const darkThemeRelatives = ref(appSetting.settings.themes.dark)
  const appRelatives = ref(appSetting.settings.app)
  const menuRelatives = ref(appSetting.settings.menu)
  const headerRelatives = ref(appSetting.settings.header)
  const breadcrumbRelatives = ref(appSetting.settings.breadcrumb)
  const tabRelatives = ref(appSetting.settings.tab)

  const modalColor = computed(
    () => getMergedTheme.value?.Drawer.common?.modalColor
  )

  const { copy, copied } = useClipboard({
    source: computed(() => JSON.stringify(appSetting.settings, null, 4)),
    copiedDuring: 8000,
  })

  const onCopy = () => {
    copy()
  }

  const [register0] = useForm<typeof lightThemeRelatives.value>({
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
        extraProp: {
          sticky: true,
          bgColor: modalColor,
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
            <AppColors v-model={[formData.primaryColor]} />
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
            <AppColors v-model={[formData.infoColor]} />
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
            <AppColors v-model={[formData.successColor]} />
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
            <AppColors v-model={[formData.warningColor]} />
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
            <AppColors v-model={[formData.errorColor]} />
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
            <AppColors v-model={[formData.bodyColor]} />
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
              v-model={[formData.invertedColor]}
              disabled={appDark.isDark}
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
        extraProp: {
          sticky: true,
          bgColor: modalColor,
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
        type: 'Extend:TransitionSelect',
        formProp: {
          path: 'animationName',
        },
        componentProp: {
          disabled: computed(() => !appRelatives.value.showAnimation),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'keepAlive',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'layout',
        },
        componentProp: {
          options: Object.values(AppLayoutModeConst).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'pageLeaveLock',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'idleMS',
        },
        componentProp: {
          step: 5000,
          min: 0,
          suffix: 'ms',
          showButton: false,
          disabled: true,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'contentPadding',
        },
        componentProp: {
          step: 1,
          min: 0,
          suffix: 'px',
          showButton: false,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showWatermark',
        },
      },
      {
        type: 'Base:Input',
        formProp: {
          path: 'watermarkContent',
        },
        componentProp: {
          disabled: computed(() => !appRelatives.value.showWatermark),
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
        extraProp: {
          sticky: true,
          bgColor: modalColor,
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
          disabled: computed(() => appMenu.collapse),
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'collapsedWidth',
        },
        componentProp: {
          disabled: computed(() => !appMenu.collapse),
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
        componentProp: {
          disabled: computed(() => appMenu.collapse),
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'collapsedIconSize',
        },
        componentProp: {
          disabled: computed(() => !appMenu.collapse),
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'indent',
        },
        componentProp: {
          disabled: computed(() => appMenu.collapse),
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'inverted',
        },
        componentProp: {
          disabled: computed(() => appDark.isDark),
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
        extraProp: {
          sticky: true,
          bgColor: modalColor,
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
        componentProp: {
          disabled: computed(() => appDark.isDark),
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
        extraProp: {
          sticky: true,
          bgColor: modalColor,
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
        extraProp: {
          sticky: true,
          bgColor: modalColor,
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
      {
        type: 'Base:Switch',
        formProp: {
          path: 'persistent',
        },
      },
    ],
  })
</script>
