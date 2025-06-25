<script lang="ts" setup>
import { useAppLocale } from '@/components/App/AppLocalePicker/useAppLocale'
import { useAppLock } from '@/components/App/AppLock/useAppLock'

import GlobalComponents from './global/index.vue'
import ThemeProvider from './naive/AppTheme.vue'
import MsgProvider from './naive/MsgProvider.vue'
import UIProvider from './naive/UIProvider.vue'

(async function () {
  await useAppUserMonitor()
})()

// P1 app level hook
useAppTitle()
useAppResize()
useAppLocale()
useAppLock()
useAppReducedMotion()
</script>

<template>
  <UIProvider>
    <ThemeProvider>
      <MsgProvider>
        <div>
          <GlobalComponents />
          <RouterView />
        </div>
      </MsgProvider>
    </ThemeProvider>
  </UIProvider>
</template>
