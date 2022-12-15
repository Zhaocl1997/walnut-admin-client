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
  import { useAppLock } from '@/components/App/AppLock/useAppLock'
  ;(async function () {
    await useSohuApi()
    await useFingerprint()
    await useAppMonitor()
  })()

  useAppTitle()
  useAppResize()
  useAppDarkMode()
  useAppLocale()
  useAppLock()
</script>
