<script lang="ts" setup>
import UIProvider from './naive/UIProvider.vue'
import MsgProvider from './naive/MsgProvider.vue'
import ThemeProvider from './naive/AppTheme.vue'

import { useAppLocale } from '@/components/App/AppLocalePicker/useAppLocale'
import { useAppLock } from '@/components/App/AppLock/useAppLock'
;

(async function () {
  await useUseragentInfo()
  await useAppMonitor()
})()

// P1 app level hook
useAppTitle()
useAppResize()
useAppLocale()
useAppLock()
useAppReducedMotion()
</script>

<template>
  <StarportCarrier>
    <UIProvider>
      <ThemeProvider>
        <MsgProvider>
          <RouterView />
        </MsgProvider>
      </ThemeProvider>
    </UIProvider>
  </StarportCarrier>
</template>
