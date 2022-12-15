<script lang="ts" setup>
import { getCanAnimate, modalColor } from '../shared'

const appSetting = useAppStoreSetting()

const logoRelatives = appSetting.logo

const [register] = useForm<typeof logoRelatives>({
  localeUniqueKey: 'app.settings',
  showFeedback: false,
  xGap: 0,
  formItemClass: 'flex flex-row justify-between mb-2',
  formItemComponentClass: '!w-32 flex justify-end',
  size: 'small',
  schemas: [
    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'app.settings.logo',
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
    },
    {
      type: 'Base:Input',
      formProp: {
        path: 'id',
      },
      componentProp: {
        disabled: computed(() => !logoRelatives.status),
      },
    },
    {
      type: 'Base:Switch',
      formProp: {
        path: 'fixed',
      },
      componentProp: {
        disabled: computed(() => !logoRelatives.status),
      },
    },
    {
      type: 'Extend:TransitionSelect',
      formProp: {
        path: 'transition',
      },
      componentProp: {
        disabled: computed(
          () => !logoRelatives.status || getCanAnimate.value,
        ),
        tooltip: true,
      },
    },
  ],
})
</script>

<template>
  <w-form :model="logoRelatives" @hook="register" />
</template>
