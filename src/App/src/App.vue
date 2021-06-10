<template>
  <AppProvider>
    <UIProvider>
      <RouterView></RouterView>
    </UIProvider>
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTitle } from '/@/hooks/core/useTitle'
  import AppProvider from './AppProvider.vue'
  import UIProvider from './UIProvider.vue'

  export default defineComponent({
    name: 'App',

    components: { AppProvider, UIProvider },

    setup() {
      useTitle()

      return {}
    },
  })
</script>
