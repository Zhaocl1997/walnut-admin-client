<template>
  <el-empty
    v-if="total === 0"
    v-bind="$props"
    :description="t('component.empty.text')"
  ></el-empty>

  <slot v-else></slot>
</template>

<script lang="ts">
  import type { SetupContext } from 'vue'
  import type { WEmptyProps } from './types'
  import { defineComponent } from 'vue'
  import { useI18n } from '/@/locales'
  import props from './props'

  export default defineComponent({
    name: 'WEmpty',

    inheritAttrs: false,

    props: props,

    setup(props: WEmptyProps, ctx: SetupContext) {
      const { t } = useI18n()

      return {
        t,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
