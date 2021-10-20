<template>
  <AppProvider>
    <UIProvider>
      <ThemeProvider>
        <MsgProvider>
          <RouterView></RouterView>
        </MsgProvider>
      </ThemeProvider>
    </UIProvider>
  </AppProvider>
</template>

<script lang="ts" setup>
  import { useAppTitle } from '/@/hooks/core/useTitle'
  import AppProvider from './AppProvider.vue'
  import UIProvider from './UIProvider.vue'
  import MsgProvider from './MsgProvider.vue'
  import ThemeProvider from './AppTheme.vue'

  useAppTitle()
</script>
