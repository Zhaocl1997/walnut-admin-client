<script lang="ts" setup>
const appForceQuit = useAppStoreForceQuit()
</script>

<template>
  <component :is="appForceQuit.forceQuitComponent" v-if="appForceQuit.forceQuitComponent" />
</template>
