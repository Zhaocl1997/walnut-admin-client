<template>
  <el-select v-bind="getBindValue" style="width: 100%;">
    <el-option
      v-for="item in options"
      :key="item[optionValue]"
      :label="item[optionLabel]"
      :value="valueKey ? item : item[optionValue]"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WSelectProps } from './types'
  import { defineComponent, computed } from 'vue'
  import props from './props'

  export default defineComponent({
    name: 'WSelect',

    inheritAttrs: false,

    props: props,

    setup(props: WSelectProps, ctx: SetupContext) {
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
