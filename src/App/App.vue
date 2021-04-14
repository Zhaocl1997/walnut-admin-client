<template>
  <AppProvider>
    <router-view></router-view>
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent, watchEffect } from 'vue'
  import { useAppRoute } from '../router'
  import { useTitle } from '../hooks/core/useTitle'
  import AppProvider from './AppProvider.vue'

  export default defineComponent({
    components: { AppProvider },

    setup() {
      const { meta } = useAppRoute()

      watchEffect(() => {
        useTitle(meta.title)
      })

      return {}
    },
  })
</script>

<style></style>
