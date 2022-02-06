<template>
  <UIProvider>
    <ThemeProvider>
      <MsgProvider>
        <RouterView></RouterView>
      </MsgProvider>
    </ThemeProvider>
  </UIProvider>
</template>

<script lang="ts" setup>
  import UIProvider from './UIProvider.vue'
  import MsgProvider from './MsgProvider.vue'
  import ThemeProvider from './AppTheme.vue'

  import { useAppTitle } from '/@/hooks/core/useAppTitle'
  import { useAppResize } from '/@/hooks/core/useAppResize'
  import { useAppFullScreen } from '/@/hooks/core/useAppFullScreen'
  import { useAppDarkMode } from '/@/components/App/AppDarkMode/useAppDarkMode'
  import { useAppLocale } from '/@/components/App/AppLocalePicker/useAppLocale'
  import { useAppPageLeave } from '/@/hooks/core/useAppPageLeave'
  import { useAppLock } from '/@/hooks/core/useAppLock'
  import { useAppTextSelection } from '/@/hooks/core/useAppTextSelection'

  useAppTitle()
  useAppResize()
  useAppFullScreen()
  useAppDarkMode()
  useAppLocale()
  useAppPageLeave()
  useAppLock()
  useAppTextSelection()
</script>
