<!-- TODO -->
<template>
  <el-radio-group v-bind="getBindValue">
    <template v-if="button">
      <el-radio-button
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
        :disabled="item.disabled"
      >
        {{ item[optionLabel] }}
      </el-radio-button>
    </template>

    <template v-else>
      <el-radio
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
        :disabled="item.disabled"
        :border="border"
      >
        {{ item[optionLabel] }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script lang="ts">
  import type { WRadioProps } from './types'
  import { defineComponent, computed } from 'vue'
  import { easyOmit } from 'easy-fns-ts'
  import props, { extendPropKeys } from './props'

  export default defineComponent({
    name: 'WRadio',

    inheritAttrs: false,

    props: props,

    setup(props: WRadioProps, ctx) {
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
