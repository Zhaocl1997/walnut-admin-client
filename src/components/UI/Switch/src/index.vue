<template>
  <el-switch v-bind="getBindValue"></el-switch>
</template>

<script lang="ts">
  import type { WSwitchProps } from './types'
  import { computed, defineComponent } from 'vue'
  import props from './props'

  export default defineComponent({
    name: 'WSwitch',

    inheritAttrs: false,

    props,

    setup(props: WSwitchProps, ctx) {
      const { attrs } = ctx
      const getBindValue = computed(() => ({ ...attrs, ...props }))
      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
