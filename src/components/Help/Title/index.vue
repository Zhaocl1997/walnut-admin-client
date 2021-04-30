<template>
  <div class="w-title">
    <span :class="getClass">
      <el-space>
        <div v-if="$slots.default" class="block pl-4 break-all">
          <slot></slot>
        </div>

        <WMessage v-if="$props.content" v-bind="getHelpProps"></WMessage>
      </el-space>
    </span>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { unref, computed, defineComponent } from 'vue'
  import { easyOmit } from 'easy-fns-ts'
  import WMessage from '../Message'

  export default defineComponent({
    name: 'WTitle',

    props: {
      ...WMessage.props,

      content: {
        type: String as PropType<string>,
        default: '',
      },

      showLeft: {
        type: Boolean as PropType<boolean>,
        default: false,
      },

      showBottom: {
        type: Boolean as PropType<boolean>,
        default: false,
      },

      placement: {
        type: String as PropType<string>,
        default: 'right',
      },
    },

    setup(props) {
      const getClass = computed(() => {
        const { showLeft, showBottom } = props

        return [
          'w-title__text',
          {
            'w-title__text-left': showLeft,
            'w-title__text-bottom': showBottom,
          },
        ]
      })

      const getHelpProps = computed(() => {
        return easyOmit(unref(props), ['showLeft', 'showBottom'])
      })

      return {
        getClass,
        getHelpProps,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .w-title {
    &__text {
      position: relative;
      padding-bottom: 8px;
      font-weight: 700;
      font-size: 16px;

      &-left {
        &::before {
          position: absolute;
          top: 50%;
          left: 0;
          display: inline-block;
          height: 16px;
          margin-top: -12px;
          border-left: 4px solid orangered;
          content: ' ';
        }
      }

      &-bottom {
        border-bottom: 1px solid #ebebeb;
      }
    }
  }
</style>
