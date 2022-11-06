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
        componentProp: {
          min: 0,
          precision: 0,
          step: 2,
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'width',
        },
        componentProp: {
          min: 0,
          precision: 0,
          step: 2,
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
        type: 'Base:Select',
        formProp: {
          path: 'showUtilsMode',
          labelHelpMessage: true,
        },
        componentProp: {
          options: Object.values(AppConstTabUtilsShowMode).map((i) => ({
            value: i,
            label: i,
          })),
          disabled: computed(() => !tabRelatives.value.showUtils),
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
        type: 'Base:Select',
        formProp: {
          path: 'closeMode',
        },
        componentProp: {
          options: Object.values(AppConstTabCloseMode).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'affixMode',
        },
        componentProp: {
          options: Object.values(AppConstTabAffixMode).map((i) => ({
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
