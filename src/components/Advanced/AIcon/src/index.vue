<template>
  <n-button text :type="type">
    <w-icon v-bind="$attrs" @click.stop></w-icon>
  </n-button>
</template>

<script lang="ts">
  import { props } from './props'

  export default defineComponent({
    name: 'WAIcon',

    props,

    setup(prop) {},
  })
</script>
