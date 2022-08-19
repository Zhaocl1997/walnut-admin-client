<template>
  <w-form
    v-if="appDark.isDark"
    @hook="register"
    :model="darkThemeRelatives"
  ></w-form>

  <w-form
    v-if="!appDark.isDark"
    @hook="register"
    :model="lightThemeRelatives"
  ></w-form>
</template>

<script lang="tsx" setup>
  import AppColors from '../component/colors'

  import {
    darkThemeRelatives,
    lightThemeRelatives,
    modalColor,
  } from '../shared'

  const appDark = useAppStoreDark()

  const [register] = useForm<typeof lightThemeRelatives.value>({
    showFeedback: false,
    xGap: 0,
    formItemClass: 'mb-2',
    formItemComponentClass: '',
    size: 'small',
    schemas: [
      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme',
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
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme.primary',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'primaryColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors v-model={[formData.primaryColor]}></AppColors>
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme.info',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'infoColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors v-model={[formData.infoColor]}></AppColors>
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme.success',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'successColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors v-model={[formData.successColor]}></AppColors>
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme.warning',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'warningColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors v-model={[formData.warningColor]}></AppColors>
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme.error',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'errorColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors v-model={[formData.errorColor]}></AppColors>
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme.body',
          titlePlacement: 'center',
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'bodyColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors v-model={[formData.bodyColor]}></AppColors>
          ),
        },
      },

      {
        type: 'Extend:Divider',
        componentProp: {
          title: 'app.settings.theme.inverted',
          titlePlacement: 'center',
          helpMessage: true,
        },
      },

      {
        type: 'Base:Render',
        formProp: {
          path: 'invertedColor',
        },
        componentProp: {
          render: ({ formData }) => (
            <AppColors
              v-model={[formData.invertedColor]}
              disabled={appDark.isDark}
            ></AppColors>
          ),
        },
      },
    ],
  })
</script>
