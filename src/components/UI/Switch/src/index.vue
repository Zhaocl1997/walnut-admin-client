<template>
  <el-switch v-bind="$props"></el-switch>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { WSwitchProps } from './types'
  import props from './props'

  export default defineComponent({
    name: 'WSwitch',

    inheritAttrs: false,

    props,

    setup(props: WSwitchProps, ctx) {},
  })
</script>

<style lang="scss" scoped></style>
