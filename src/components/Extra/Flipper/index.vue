<template>
  <div
    v-bind="$attrs"
    :class="['Flipper', { 'Flipper--flipped': flipped }]"
    :style="getStyle.wrapper"
    @click="onClick"
    @mouseenter="onMouseEnterAndLeave"
    @mouseleave="onMouseEnterAndLeave"
  >
    <div class="Flipper__face Flipper__face--front" :style="getStyle.face">
      <slot name="front" />
    </div>

    <div class="Flipper__face Flipper__face--back" :style="getStyle.face">
      <slot name="back" />
    </div>
  </div>
</template>

<script lang="ts">
  import type { CSSProperties } from 'vue'

  export default defineComponent({
    name: 'WFlipper',

    inheritAttrs: false,

    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
        validator: isCSSLength,
      },

      height: {
        type: String as PropType<string>,
        default: '100%',
        validator: isCSSLength,
      },

      duration: {
        type: String as PropType<string>,
        default: '500ms',
        validator: isCSSTime,
      },

      transitionTimingFunction: {
        type: String as PropType<string>,
        default: 'cubic-bezier(0.4, 0, 1, 1)',
      },

      trigger: {
        type: String as PropType<Extract<ComponentTrigger, 'click' | 'hover'>>,
        default: 'click',
      },

      defaultFace: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
    },

    emits: ['click'],

    setup(props, { emit, expose }) {
      const flipped = ref(false)

      const getStyle = computed(() => {
        const { width, height, duration, transitionTimingFunction } = props
        return {
          wrapper: { width: width, height: height } as CSSProperties,
          face: Object.assign(
            {
              transitionDuration: duration,
              transitionTimingFunction: transitionTimingFunction,
            },
            props.defaultFace
              ? {
                  borderRadius: '20px',
                  boxShadow: '0 3px 15px rgba(64, 64, 64, 0.45)',
                }
              : {}
          ) as CSSProperties,
        }
      })

      const onClick = (e: MouseEvent) => {
        const { trigger } = props
        if (trigger === 'click') {
          flipped.value = !flipped.value
        }
        emit('click', e)
      }

      const onMouseEnterAndLeave = () => {
        const { trigger } = props
        if (trigger === 'hover') {
          flipped.value = !flipped.value
        }
      }

      expose({
        onFlip: onClick,
      })

      return {
        flipped,
        getStyle,
        onClick,
        onMouseEnterAndLeave,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .Flipper {
    position: relative;
    perspective: 1000px;
  }
  .Flipper__face {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  .Flipper__face--back,
  .Flipper--flipped .Flipper__face--front {
    transform: rotateY(180deg);
    visibility: hidden;
  }
  .Flipper--flipped {
    .Flipper__face--back {
      transform: rotateY(360deg);
      visibility: visible;
    }
  }
</style>
