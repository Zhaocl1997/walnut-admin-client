<template>
  <div>
    <n-popselect v-model:value="appDark.darkMode" :options="darkModeOptions">
      <w-icon
        :icon="appDark.isDark ? 'carbon:moon' : 'carbon:sun'"
        width="24"
      ></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts" setup>
  const { t } = useAppI18n()
  const appDark = useAppDarkStore()

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
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppDarkMode',
  })
</script>
