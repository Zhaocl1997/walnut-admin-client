<template>
  <div>
    <n-popselect v-model:value="app.darkMode" :options="darkModeOptions">
      <w-icon
        :icon="
          app.isDark
            ? 'emojione:waxing-crescent-moon'
            : 'emojione:waxing-gibbous-moon'
        "
        width="24"
      ></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts">
  import { DarkModeEnum } from '/@/enums/dark'
  import { useDarkMode } from './useAppDarkMode'

  export default defineComponent({
    name: 'AppDarkMode',

    inheritAttrs: false,

    setup() {
      const { t } = useAppI18n()
      const { app } = useDarkMode()

      const darkModeOptions = computed(() => {
        return [
          {
            value: DarkModeEnum.LIGHT,
            label: t('system.global.darkMode.light'),
          },
          {
            value: DarkModeEnum.DARK,
            label: t('system.global.darkMode.dark'),
          },
          {
            value: DarkModeEnum.SYSTEM,
            label: t('system.global.darkMode.system'),
          },
        ]
      })

      return {
        app,
        darkModeOptions,
      }
    },
  })
</script>
