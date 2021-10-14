<template>
  <AppProvider>
    <UIProvider>
      <MsgProvider>
        <RouterView></RouterView>
      </MsgProvider>
    </UIProvider>
  </AppProvider>
</template>

<script lang="ts">
  import { useAppTitle } from '/@/hooks/core/useTitle'
  import AppProvider from './AppProvider.vue'
  import UIProvider from './UIProvider.vue'
  import MsgProvider from './MsgProvider.vue'

  export default defineComponent({
    name: 'App',

    components: { AppProvider, UIProvider, MsgProvider },

    setup() {
      useAppTitle()

      return {}
    },
  })
</script>
