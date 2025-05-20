<script lang="ts" setup>
import { getCanAnimate, modalColor } from '../shared'

const appSetting = useAppStoreSetting()

const footerRelatives = appSetting.footer

const [register] = useForm<typeof footerRelatives>({
  localeUniqueKey: 'app.settings.footer',
  showFeedback: false,
  xGap: 0,
  formItemClass: 'flex flex-row justify-between mb-2',
  formItemComponentClass: '!w-32 flex justify-end',
  size: 'small',
  disabled: computed(() => !footerRelatives.status),
  schemas: [
    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'app.settings.footer',
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
      type: 'Extra:TransitionSelect',
      formProp: {
        path: 'transition',
      },
      componentProp: {
        disabled: computed(
          () => !footerRelatives.status || getCanAnimate.value,
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
        disabled: computed(() => !footerRelatives.status || isDark.value),
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
      type: 'Base:Input',
      formProp: {
        path: 'content',
      },
    },
  ],
})
</script>

<template>
  <WForm :model="footerRelatives" @hook="register" />
</template>
