<template>
  <IconifyVueComponent
    :style="{
      color: $attrs.disabled
        ? 'var(--icon-color-disabled)'
        : 'var(--text-color-base)',
    }"
  />
</template>

<script lang="ts">
  import { Icon as IconifyVueComponent } from '@iconify/vue'

  export default defineComponent({
    name: 'WIcon',

    components: { IconifyVueComponent },

    setup() {},
  })
</script>

<style scoped>
  :focus {
    outline: none;
  }
</style>
