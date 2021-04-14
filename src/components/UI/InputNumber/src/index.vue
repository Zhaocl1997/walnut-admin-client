<template>
  <el-input-number v-bind="getBindValue" />
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WInputNumberProps } from './types'
  import { defineComponent, computed } from 'vue'
  import props from './props'

  export default defineComponent({
    name: 'WInputNumber',

    inheritAttrs: false,

    props: props,

    setup(props: WInputNumberProps, ctx: SetupContext) {
      const { attrs } = ctx

      const getBindValue = computed(() => {
        return { ...attrs, ...props }
      })

      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
