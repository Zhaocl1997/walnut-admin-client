<template>
  <el-button v-bind="getBindValue" :class="{ 'w-full': block }">
    <el-space size="mini">
      <slot v-if="$slots.prefix" name="prefix"></slot>

      <span v-if="delayText">{{ delayText }}</span>
      <span v-else-if="$slots.default"><slot></slot></span>
      <span v-else-if="text">{{ text }}</span>

      <slot v-if="$slots.suffix" name="suffix"></slot>

      <i v-if="suffixIcon" :class="suffixIcon" />
    </el-space>
  </el-button>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WButtonProps } from './types'
  import { defineComponent } from 'vue'
  import props from './props'
  import { useButton } from './hooks/useButton'

  export default defineComponent({
    name: 'WButton',

    inheritAttrs: false,

    props: props,

    emits: ['click'],

    setup(props: WButtonProps, ctx: SetupContext) {
      return useButton(props, ctx)
    },
  })
</script>

<style lang="scss" scoped></style>
