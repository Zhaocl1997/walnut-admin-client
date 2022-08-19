<template>
  <w-form @hook="register" :model="menuRelatives"></w-form>
</template>

<script lang="ts" setup>
  import { appRelatives, menuRelatives, modalColor } from '../shared'

  const appMenu = useAppStoreMenu()
  const appDark = useAppStoreDark()

  const [register] = useForm<typeof menuRelatives.value>({
    localeUniqueKey: 'app.menu',
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
          title: 'app.settings.menu',
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
          options: Object.values(AppConstCollapseMode).map((i) => ({
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
</script>
