<template>
  <el-tooltip v-bind="getBindValue">
    <template v-if="$slots.content" #content>
      <slot name="content"></slot>
    </template>

    <i :class="$props.icon"></i>
  </el-tooltip>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { easyOmit } from 'easy-fns-ts'
  import { ElTooltip } from 'element-plus'
  import { unref, computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'WMessage',

    props: {
      ...ElTooltip.props,

      icon: {
        type: String as PropType<string>,
        default: 'el-icon-question',
      },
    },

    setup(props) {
      const getBindValue = computed(() => {
        return easyOmit(unref(props), 'icon')
      })

      return {
        getBindValue,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
