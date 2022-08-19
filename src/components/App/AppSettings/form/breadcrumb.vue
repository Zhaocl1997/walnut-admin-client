<template>
  <w-form @hook="register4" :model="breadcrumbRelatives"></w-form>
</template>

<script lang="ts" setup>
  import {
    appRelatives,
    breadcrumbRelatives,
    headerRelatives,
    modalColor,
  } from '../shared'

  const [register4] = useForm<typeof breadcrumbRelatives.value>({
    localeUniqueKey: 'app.bc',
    showFeedback: false,
    xGap: 0,
    formItemClass: 'flex flex-row justify-between mb-2',
    formItemComponentClass: 'w-32 flex justify-end',
    size: 'small',
    disabled: computed(
      () =>
        !appRelatives.value.showHeader || !headerRelatives.value.showBreadcrumb
    ),
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
          options: ['>', '/'].map((i) => ({ value: i, label: i })),
        },
      },
    ],
  })
</script>
