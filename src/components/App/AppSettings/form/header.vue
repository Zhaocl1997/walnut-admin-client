<template>
  <w-form @hook="register" :model="headerRelatives"></w-form>
</template>

<script lang="ts" setup>
  import { appRelatives, headerRelatives, modalColor } from '../shared'

  const appDark = useAppStoreDark()

  const [register] = useForm<typeof headerRelatives.value>({
    localeUniqueKey: 'app.header',
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
          title: 'app.settings.header',
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
</script>
