<script lang="ts" setup>
import { getCanAnimate, modalColor } from '../shared'

const appSetting = useAppStoreSetting()

const breadcrumbRelatives = appSetting.breadcrumb

const [register4] = useForm<typeof breadcrumbRelatives>({
  localeUniqueKey: 'app.settings.breadcrumb',
  showFeedback: false,
  xGap: 0,
  formItemClass: 'flex flex-row justify-between mb-2',
  formItemComponentClass: '!w-32 flex justify-end',
  size: 'small',
  disabled: computed(() => !breadcrumbRelatives.status),
  schemas: [
    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'app.settings.breadcrumb',
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
      type: 'Extend:TransitionSelect',
      formProp: {
        path: 'transition',
      },
      componentProp: {
        disabled: computed(
          () => !breadcrumbRelatives.status || getCanAnimate.value,
        ),
        tooltip: true,
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
        path: 'showDropdown',
      },
    },
    {
      type: 'Base:Select',
      formProp: {
        path: 'separator',
      },
      componentProp: {
        options: ['>', '/'].map(i => ({ value: i, label: i })),
      },
    },
  ],
})
</script>

<template>
  <w-form :model="breadcrumbRelatives" @hook="register4" />
</template>
