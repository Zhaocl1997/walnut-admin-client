<template>
  <el-popover placement="bottom" width="auto" trigger="click">
    <template #reference>
      <w-icon
        :icon="
          app.isDark
            ? 'emojione:waxing-crescent-moon'
            : 'emojione:waxing-gibbous-moon'
        "
        height="24"
      ></w-icon>
    </template>

    <WCheckTag v-model="app.darkMode" :options="darkModeOptions"></WCheckTag>
  </el-popover>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  import { useI18n } from '/@/locales'
  import { DarkModeEnum } from '/@/enums/dark'
  import { useDarkMode } from './useDarkMode'

  export default defineComponent({
    name: 'AppDarkMode',

    inheritAttrs: false,

    setup() {
      const { t } = useI18n()

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

      const { app } = useDarkMode()

      return {
        app,
        darkModeOptions,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
