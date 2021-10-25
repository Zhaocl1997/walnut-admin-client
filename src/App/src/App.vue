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

  useAppTitle()
  useAppResize()
  useAppFullScreen()
</script>
