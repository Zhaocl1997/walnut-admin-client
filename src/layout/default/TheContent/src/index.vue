<template>
  <div class="w-default-layout-content">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Content',

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
