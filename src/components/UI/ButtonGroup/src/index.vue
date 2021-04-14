<template>
  <el-space>
    <div v-for="(button, index) in groups" :key="index">
      <w-button v-bind="button"></w-button>
    </div>
  </el-space>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import type { WButtonProps } from '../../Button/src/types'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WButtonGroup',

    inheritAttrs: false,

    props: {
      groups: {
        type: Array as PropType<WButtonProps[]>,
        default: () => [],
      },
    },

    setup() {},
  })
</script>

<style lang="scss" scoped></style>
