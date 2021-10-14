<template>
  <AppProvider>
    <UIProvider>
      <RouterView></RouterView>
    </UIProvider>
  </AppProvider>
</template>

<script lang="ts">
  import { useAppTitle } from '/@/hooks/core/useTitle'
  import AppProvider from './AppProvider.vue'
  import UIProvider from './UIProvider.vue'

  export default defineComponent({
    name: 'App',

    components: { AppProvider, UIProvider },

    setup() {
      useAppTitle()

      return {}
    },
  })
</script>
