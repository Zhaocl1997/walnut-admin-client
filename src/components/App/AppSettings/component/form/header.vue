<script lang="ts" setup>
import { getCanAnimate, modalColor } from '../../shared'

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
      gridProp: {
        class: 'sticky top-0 z-10 py-2',
        style: {
          backgroundColor: modalColor,
        },
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
      type: 'Base:Switch',
      formProp: {
        path: 'scrollUpShow',
      },
      componentProp: {
        disabled: computed(() => headerRelatives.fixed),
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'liveOnHover',
      },
      componentProp: {
        disabled: computed(() => headerRelatives.fixed || !headerRelatives.scrollUpShow),
      },
    },
    {
      type: 'Extra:TransitionSelect',
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
  ],
})
</script>

<template>
  <WForm :model="headerRelatives" @hook="register" />
</template>
