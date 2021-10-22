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
  /**
   * Curries a predicate function to check if value matches pattern.
   * @param {RegExp} pattern
   * @returns {(value: string) => boolean}
   */
  const isPattern = (pattern: RegExp) => (value: string) => pattern.test(value)

  /**
   * Check if value is a CSS Length.
   */
  const isCSSLength = isPattern(
    /^\+?(\d*\.)?\d+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/i
  )

  /**
   * Check if value is a CSS Time.
   */
  const isCSSTime = isPattern(/^\+?(\d*\.)?\d+(ms|s)$/i)

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
    },

    emits: ['click'],

    setup(props, { emit }) {
      const flipped = ref(false)

      const getStyle = computed(() => {
        const { width, height, duration, transitionTimingFunction } = props
        return {
          wrapper: { width: width, height: height },
          face: {
            transitionDuration: duration,
            transitionTimingFunction: transitionTimingFunction,
          },
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
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    border-radius: 20px;
    box-shadow: 0 3px 15px rgba(#000, 0.45);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    cursor: pointer;
  }

  .Flipper__face--back,
  .Flipper--flipped .Flipper__face--front {
    visibility: hidden;
    transform: rotateY(180deg);
  }

  .Flipper--flipped .Flipper__face--back {
    visibility: visible;
    transform: rotateY(360deg);
  }
</style>
