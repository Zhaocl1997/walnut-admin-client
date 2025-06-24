<script lang="ts" setup>
const appCapJSToken = useAppStoreCapJSToken()
</script>

<template>
  <component :is="appCapJSToken.capComponent" v-if="appCapJSToken.capComponent" />
</template>
