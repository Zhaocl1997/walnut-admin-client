<template>
  <w-form @hook="register" :model="appRelatives"></w-form>
</template>

<script lang="ts" setup>
  import { modalColor, getCanAnimate } from '../shared'

  const appSetting = useAppStoreSetting()
  const isReducedMotion = useSharedPreferredReducedMotion()

  const appRelatives = appSetting.app

  const [register] = useForm<typeof appRelatives>({
    localeUniqueKey: 'app.settings.app',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: '!w-32 flex justify-end',
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.app',
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
        type: 'Base:Select',
        formProp: {
          path: 'layout',
        },
        componentProp: {
          disabled: true,
          options: Object.values(AppConstLayoutMode).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'keepAlive',
          labelHelpMessage: true,
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
          precision: 0,
        },
      },

      {
        type: 'Base:Select',
        formProp: {
          path: 'routeQueryMode',
          labelHelpMessage: true,
        },
        componentProp: {
          disabled: true,
          options: Object.values(AppConstRouteQueryMode).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },

      {
        type: 'Base:Select',
        formProp: {
          path: 'routeQueryEnhancedMode',
          labelHelpMessage: true,
        },
        componentProp: {
          disabled: true,
          options: Object.values(AppConstRouteQueryEnhancedMode).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'transitionStatus',
        },
        componentProp: {
          disabled: getCanAnimate,
        },
      },

      {
        type: 'Base:Select',
        formProp: {
          path: 'transitionMode',
          labelHelpMessage: true,
        },
        componentProp: {
          disabled: computed(
            () => getCanAnimate.value || !appRelatives.transitionStatus
          ),
          options: Object.values(AppConstBasicMode).map((i) => ({
            label: i,
            value: i,
          })),
        },
      },

      {
        type: 'Extend:TransitionSelect',
        formProp: {
          path: 'transitionName',
        },
        componentProp: {
          disabled: computed(
            () =>
              getCanAnimate.value ||
              appRelatives.transitionMode === AppConstBasicMode.SCOPE ||
              !appRelatives.transitionStatus
          ),
          tooltip: true,
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'watermarkStatus',
        },
      },

      {
        type: 'Base:Select',
        formProp: {
          path: 'watermarkMode',
          labelHelpMessage: true,
        },
        componentProp: {
          disabled: computed(() => !appRelatives.watermarkStatus),
          options: Object.values(AppConstBasicMode).map((i) => ({
            label: i,
            value: i,
          })),
        },
      },

      {
        type: 'Base:Input',
        formProp: {
          path: 'watermarkContent',
        },
        componentProp: {
          disabled: computed(
            () =>
              !appRelatives.watermarkStatus ||
              appRelatives.watermarkMode === AppConstBasicMode.SCOPE
          ),
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'lockStatus',
        },
      },

      {
        type: 'Base:Select',
        formProp: {
          path: 'lockMode',
        },
        componentProp: {
          disabled: computed(() => !appRelatives.lockStatus),
          options: Object.values(AppConstLockMode).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },
      {
        type: 'Base:InputNumber',
        formProp: {
          path: 'lockIdleSeconds',
        },
        componentProp: {
          step: 1,
          min: 0,
          suffix: 's',
          showButton: false,
          precision: 0,
        },
        extraProp: {
          vShow: ({ formData }) => formData.lockMode === AppConstLockMode.IDLE,
          disabled: computed(() => !appRelatives.lockStatus),
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'hijackRefresh',
          labelHelpMessage: true,
        },
      },

      {
        type: 'Base:Select',
        formProp: {
          path: 'colorMode',
        },
        componentProp: {
          clearable: true,
          options: Object.values(AppConstColorMode).map((i) => ({
            value: i,
            label: i,
          })),
        },
      },

      {
        type: 'Base:Switch',
        formProp: {
          path: 'reducedMotion',
          labelHelpMessage: true,
        },
        componentProp: {
          // disable this switch when system prefers reduced motion
          disabled: isReducedMotion,
        },
      },
    ],
  })
</script>
