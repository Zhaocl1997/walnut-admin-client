<template>
  <StarportCarrier>
    <UIProvider>
      <ThemeProvider>
        <MsgProvider>
          <RouterView></RouterView>
        </MsgProvider>
      </ThemeProvider>
    </UIProvider>
  </StarportCarrier>
</template>

<script lang="ts" setup>
  import UIProvider from './naive/UIProvider.vue'
  import MsgProvider from './naive/MsgProvider.vue'
  import ThemeProvider from './naive/AppTheme.vue'

  import { useAppDarkMode } from '@/components/App/AppDarkMode/useAppDarkMode'
  import { useAppLocale } from '@/components/App/AppLocalePicker/useAppLocale'

  useSohuApi().then(() => {
    useFingerprint()
    useAppMonitor()
  })
  useAppTitle()
  useAppResize()
  useAppDarkMode()
  useAppLocale()
</script>
