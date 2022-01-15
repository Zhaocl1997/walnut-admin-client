<template>
  <div>
    <n-popselect v-model:value="app.darkMode" :options="darkModeOptions">
      <w-icon
        :icon="app.isDark ? 'carbon:moon' : 'carbon:sun'"
        width="24"
      ></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'AppDarkMode',

    inheritAttrs: false,

    setup() {
      const { t } = useAppI18n()
      const { app } = useAppState()

      const darkModeOptions = computed(() => [
        {
          value: DarkModeConst.LIGHT,
          label: t('sys:dark:light'),
        },
        {
          value: DarkModeConst.DARK,
          label: t('sys:dark:dark'),
        },
        {
          value: DarkModeConst.SYSTEM,
          label: t('sys:dark:sys'),
        },
      ])

      return {
        app,
        darkModeOptions,
      }
    },
  })
</script>
