<template>
  <w-form @hook="register" :model="tabRelatives"></w-form>
</template>

<script lang="ts" setup>
  import { appRelatives, modalColor, tabRelatives } from '../shared'

  const [register] = useForm<typeof tabRelatives.value>({
    localeUniqueKey: 'app.tab',
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
          title: 'app.settings.tab',
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
          options: Object.values(AppConstTabStyleMode).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },
      {
        type: 'Extend:TransitionSelect',
        formProp: {
          path: 'animationName',
        },
        componentProp: {
          tooltip: true,
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
