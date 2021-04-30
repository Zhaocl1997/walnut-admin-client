<template>
  <el-select v-bind="getBindValue" :class="{ 'w-full': block }">
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
  import type { WSelectProps } from './types'
  import { defineComponent, computed } from 'vue'
  import { easyOmit } from 'easy-fns-ts'
  import props, { extendPropKeys } from './props'

  export default defineComponent({
    name: 'WSelect',

    inheritAttrs: false,

    props: props,

    setup(props: WSelectProps, ctx) {
      const { attrs } = ctx

      const getBindValue = computed(() => {
        return { ...attrs, ...easyOmit(props, extendPropKeys) }
      })

      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
