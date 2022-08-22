<template>
  <w-form @hook="register" :model="appRelatives"></w-form>
</template>

<script lang="ts" setup>
  import { appRelatives, modalColor } from '../shared'

  const preferredReducedMotion = usePreferredReducedMotion()

  const appSettings = useAppStoreSetting()

  const getSystemCanAnimtion = computed(
    () => preferredReducedMotion.value === 'no-preference'
  )

  const getCanAnimation = computed(
    () => getSystemCanAnimtion && appSettings.settings.app.reducedMotion
  )

  const [register] = useForm<typeof appRelatives.value>({
    localeUniqueKey: 'app.app',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: 'w-32 flex justify-end',
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
          path: 'keepAlive',
          labelHelpMessage: true,
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'layout',
        },
        componentProp: {
          options: Object.values(AppConstLayoutMode).map((i) => ({
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
          disabled: !getSystemCanAnimtion,
        },
      },
      {
        type: 'Base:Switch',
        formProp: {
          path: 'showAnimation',
        },
        componentProp: {
          disabled: getCanAnimation,
        },
      },
      {
        type: 'Base:Select',
        formProp: {
          path: 'animationMode',
          labelHelpMessage: true,
        },
        componentProp: {
          disabled: computed(
            () => getCanAnimation.value || !appRelatives.value.showAnimation
          ),
          options: Object.values(AppConstAnimationMode).map((i) => ({
            label: i,
            value: i,
          })),
        },
      },
      {
        type: 'Extend:TransitionSelect',
        formProp: {
          path: 'animationName',
        },
        componentProp: {
          disabled: computed(
            () =>
              getCanAnimation.value ||
              appRelatives.value.animationMode ===
                AppConstAnimationMode.SCOPE ||
              !appRelatives.value.showAnimation
          ),
          tooltip: true,
        },
      },
    ],
  })
</script>
