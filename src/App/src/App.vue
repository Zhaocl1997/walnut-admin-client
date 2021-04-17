<template>
  <AppProvider>
    <router-view></router-view>
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent, watchEffect } from 'vue'
  import { useAppRoute } from '/@/router'
  import { useTitle } from '/@/hooks/core/useTitle'
  import AppProvider from './AppProvider.vue'

  export default defineComponent({
    name: 'App',

    components: { AppProvider },

    setup() {
      const route = useAppRoute()

      watchEffect(() => {
        useTitle(route.meta.title)
      })

      return {}
    },
  })
</script>
