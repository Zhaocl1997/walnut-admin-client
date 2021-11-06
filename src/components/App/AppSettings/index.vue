<template>
  <div ref="el" :style="style" class="fixed cursor-pointer hover:text-primary">
    <w-icon
      height="32"
      icon="ant-design:setting-outlined"
      @click.stop.prevent="() => (show = true)"
      :style="{ zIndex: 9999 }"
    ></w-icon>
  </div>

  <w-drawer v-model:show="show" :width="350" title="App Settings">
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
  const { settings } = useAppState()

  const el = ref(null)
  const show = ref(false)
  const myx = ref()
  const myy = ref()

  const { width, height } = useWindowSize()

  const { style, x, y } = useDraggable(el, {
    initialValue: { x: width.value - 50, y: height.value - 50 },
    preventDefault: true,
    onMove: (p) => {
      myx.value = p.x
      myy.value = p.y
    },
  })

  watchEffect(() => {
    x.value = myx.value ?? width.value - 50
    y.value = myy.value ?? height.value - 50
  })

  const appRelatives = ref(settings.value.ForDevelopers.app)
  const menuRelatives = ref(settings.value.ForDevelopers.menu)
  const headerRelatives = ref(settings.value.ForDevelopers.header)
  const breadcrumbRelatives = ref(settings.value.ForDevelopers.breadcrumb)
  const tabRelatives = ref(settings.value.ForDevelopers.tab)

  const [register1] = useForm<typeof appRelatives.value>({
    size: 'small',
    schemas: [
      {
        type: 'Base:Render',
        componentProp: {
          render: () => (
            <n-text class="text-center w-full">For Developers</n-text>
          ),
        },
      },
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'App Relatives',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showLogo',
          label: 'Show Logo',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showMenu',
          label: 'Show Menu',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showHeader',
          label: 'Show Header',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showTabs',
          label: 'Show Tabs',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showFooter',
          label: 'Show Footer',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'fixLogo',
          label: 'Fix logo',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'fixHeader',
          label: 'Fix header',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showAnimation',
          label: 'Page Animation',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'animationName',
          label: 'Animation Type',
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
          label: 'Keep Alive Pages',
        },
      },
    ],
  })

  const [register2] = useForm<typeof menuRelatives.value>({
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'Menu Relatives',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showCollapse',
          label: 'Show Collapse',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'collapseMode',
          label: 'Collapse Mode',
        },
        componentProp: {
          options: Object.values(MenuCollapseModeConst).map((i) => ({
            value: i,
            label: i,
          })),
          disabled: computed(
            () => !settings.value.ForDevelopers.menu.showCollapse
          ),
        },
      },

      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'width',
          label: 'Width',
        },
        componentProp: {
          step: 10,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'collapsedWidth',
          label: 'Collapsed Width',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'accordion',
          label: 'Accordion',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'collapsedIconSize',
          label: 'Collapsed Icon Size',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'iconSize',
          label: 'Icon Size',
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'indent',
          label: 'Indent',
        },
      },
    ],
  })

  const [register3] = useForm<typeof headerRelatives.value>({
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'Header Relatives',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'height',
          label: 'Height',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showBreadcrumb',
          label: 'Breadcrumb',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showFullScreen',
          label: 'Full Screen',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showLocale',
          label: 'Locale',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showDarkMode',
          label: 'Dark Mode',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showLock',
          label: 'Lock',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showSearch',
          label: 'Search',
        },
      },
    ],
  })

  const [register4] = useForm<typeof breadcrumbRelatives.value>({
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'Breadcrumb Relatives',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showIcon',
          label: 'Icon',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showDropdown',
          label: 'Dropdown',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'separator',
          label: 'Separator',
        },
        componentProp: {
          options: ['>', '/'].map((i) => ({ value: i, label: i })),
        },
      },
    ],
  })

  const [register5] = useForm<typeof tabRelatives.value>({
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'Tab Relatives',
          prefix: 'bar',
          titlePlacement: 'left',
          foldable: true,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'height',
          label: 'Height',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showIcon',
          label: 'Icon',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showUtils',
          label: 'Utils',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'contextMenu',
          label: 'Context Menu',
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'sortable',
          label: 'Sortable',
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'styleMode',
          label: 'Style',
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
