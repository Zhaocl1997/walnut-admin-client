<template>
  <IconifyVueComponent class="dark:text-primary" />
</template>

<script lang="ts">
  import { Icon as IconifyVueComponent } from '@iconify/vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WIcon',

    components: { IconifyVueComponent },

    setup() {},
  })
</script>

<style scoped></style>
