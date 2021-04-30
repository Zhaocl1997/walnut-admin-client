<template>
  <template v-if="($slots.default || text) && !multiple">
    <el-checkbox v-bind="getBindValue">
      <span v-if="$slots.default"><slot></slot></span>
      <span v-else-if="text">{{ text }}</span>
    </el-checkbox>
  </template>

  <template v-else>
    <el-checkbox-group v-bind="getBindValue">
      <el-checkbox
        v-for="item in options"
        :key="item[optionValue]"
        :label="item[optionValue]"
        :disabled="item.disabled"
      >
        {{ item[optionLabel] }}
      </el-checkbox>
    </el-checkbox-group>
  </template>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WCheckboxProps } from './types'
  import { defineComponent, computed } from 'vue'
  import { easyOmit } from 'easy-fns-ts'
  import props, { extendPropKeys } from './props'

  export default defineComponent({
    name: 'WCheckbox',

    inheritAttrs: false,

    props: props,

    setup(props: WCheckboxProps, ctx: SetupContext) {
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
