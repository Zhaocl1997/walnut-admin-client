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

  import { useAppFullScreen } from '@/components/App/AppFullScreen/useAppFullScreen'
  import { useAppDarkMode } from '@/components/App/AppDarkMode/useAppDarkMode'
  import { useAppLocale } from '@/components/App/AppLocalePicker/useAppLocale'

  import { useAppAutoLock } from '../../hooks/core/useAppAutoLock'

  useAppTitle()
  useAppResize()
  useAppFullScreen()
  useAppDarkMode()
  useAppLocale()
  useAppPageLeave()
  useAppAutoLock()
  useAppTextSelection()
  useAppColorMode()
  useAppReducedMotion()
</script>
