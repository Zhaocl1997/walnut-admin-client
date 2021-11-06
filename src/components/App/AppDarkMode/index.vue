<template>
  <div>
    <n-popselect
      v-model:value="app.darkMode"
      :options="darkModeOptions"
      trigger="click"
    >
      <w-icon
        :icon="app.isDark ? 'carbon:moon' : 'carbon:sun'"
        width="24"
      ></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts">
  import { useDarkMode } from './useAppDarkMode'

  export default defineComponent({
    name: 'AppDarkMode',

    inheritAttrs: false,

    setup() {
      const { t } = useAppI18n()
      const { app } = useDarkMode()

      const darkModeOptions = computed(() => [
        {
          value: DarkModeConst.LIGHT,
          label: t('system.global.darkMode.light'),
        },
        {
          value: DarkModeConst.DARK,
          label: t('system.global.darkMode.dark'),
        },
        {
          value: DarkModeConst.SYSTEM,
          label: t('system.global.darkMode.system'),
        },
      ])

      return {
        app,
        darkModeOptions,
      }
    },
  })
</script>
