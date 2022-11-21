<template>
  <div>
    dashboard

    <div v-for="(item, index) in 500" :key="index">aabbccddeeff</div>
  </div>
</template>

<script lang="ts" setup>
  const state = ref()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'Dashboard',
  })
</script>
