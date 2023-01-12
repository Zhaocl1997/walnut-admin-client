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
    class="h-screen w-screen bg-black/95 text-white overflow-hidden absolute top-0 left-0 bottom-0 right-0"
  >
    <LockMobile v-if="appAdapter.isMobile" />

    <LockDesktop v-else />
  </div>
</template>
