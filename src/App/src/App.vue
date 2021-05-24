<template>
  <AppProvider>
    <router-view></router-view>
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTitle } from '/@/hooks/core/useTitle'
  import AppProvider from './AppProvider.vue'

  export default defineComponent({
    name: 'App',

    components: { AppProvider },

    setup() {
      useTitle()

      return {}
    },
  })
</script>
