<script lang="ts" setup>
import { getCanAnimate, modalColor } from '../shared'

const appSetting = useAppStoreSetting()

const headerRelatives = appSetting.header

const [register] = useForm<typeof headerRelatives>({
  localeUniqueKey: 'app.settings.header',
  showFeedback: false,
  xGap: 0,
  formItemClass: 'flex flex-row justify-between mb-2',
  formItemComponentClass: '!w-32 flex justify-end',
  size: 'small',
  disabled: computed(() => !headerRelatives.status),
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
      type: 'Base:Switch',
      formProp: {
        path: 'status',
      },
      componentProp: {
        disabled: false,
      },
    },
    {
      type: 'Base:Input',
      formProp: {
        path: 'id',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'fixed',
      },
    },
    {
      type: 'Extend:TransitionSelect',
      formProp: {
        path: 'transition',
      },
      componentProp: {
        disabled: computed(
          () => !headerRelatives.status || getCanAnimate.value,
        ),
        tooltip: true,
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'inverted',
      },
      componentProp: {
        disabled: computed(() => !headerRelatives.status || isDark.value),
      },
    },
    {
      type: 'Base:InputNumber',
      formProp: {
        path: 'height',
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
      type: 'Base:Switch',
      formProp: {
        path: 'fullscreen',
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'search',
      },
    },
    // TODO below two should belong to system functionaility
    // {
    //   type: 'Base:Switch',
    //   formProp: {
    //     path: 'showLocale',
    //   },
    // },
    // {
    //   type: 'Base:Switch',
    //   formProp: {
    //     path: 'showDarkMode',
    //   },
    // },
  ],
})
</script>

<template>
  <w-form :model="headerRelatives" @hook="register" />
</template>
