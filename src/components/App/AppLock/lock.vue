<script lang="ts" setup>
import LockMobile from './src/mobile.vue'
import LockDesktop from './src/desktop.vue'

const appAdapter = useAppStoreAdapter()
</script>

<script lang="ts">
export default defineComponent({
  name: 'Lock',
})
</script>

<template>
  <div
    class="absolute bottom-0 left-0 right-0 top-0 h-screen w-screen overflow-hidden bg-black/95 text-white"
  >
    <LockMobile v-if="appAdapter.isMobile" />

    <LockDesktop v-else />
  </div>
</template>
