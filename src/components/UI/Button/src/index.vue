<template>
  <el-button v-bind="getBindValue" :class="{ 'w-full': block }">
    <el-space size="mini">
      <slot v-if="$slots.prefix" name="prefix"></slot>

      <span v-if="delayText">{{ delayText }}</span>
      <span v-else-if="$slots.default"><slot></slot></span>
      <span v-else-if="text">{{ text }}</span>

      <slot v-if="$slots.suffix" name="suffix"></slot>

      <i v-if="suffixIcon" :class="suffixIcon" />

      <w-message
        v-if="helpMessage"
        :content="helpMessage"
        icon="el-icon-warning-outline"
      />
    </el-space>
  </el-button>
</template>

<script lang="ts">
  import type { WButtonProps } from './types'
  import { defineComponent } from 'vue'
  import { useButton } from './hooks/useButton'
  import props from './props'

  export default defineComponent({
    name: 'WButton',

    inheritAttrs: false,

    props: props,

    emits: ['click'],

    setup(props: WButtonProps, ctx) {
      return useButton(props, ctx)
    },
  })
</script>

<style lang="scss" scoped></style>
