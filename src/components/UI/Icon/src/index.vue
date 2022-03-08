<template>
  <Icon />
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue'
</script>

<script lang="ts">
  import { props } from './props'

  export default defineComponent({
    name: 'WIcon',

    props,
  })
</script>
