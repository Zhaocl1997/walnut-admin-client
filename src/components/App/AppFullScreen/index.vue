<template>
  <div @click="toggleFullScreen">
    <w-icon
      class="cursor-pointer"
      :width="width"
      :icon="
        isFullscreen
          ? 'ant-design:fullscreen-exit-outlined'
          : 'ant-design:fullscreen-outlined'
      "
    ></w-icon>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent } from 'vue'

  import { useFullScreen } from './useFullScreen'

  export default defineComponent({
    name: 'AppFullScreen',

    inheritAttrs: false,

    props: {
      target: {
        type: String as PropType<string>,
        default: '#app',
      },

      width: {
        type: String as PropType<string>,
        default: '24px',
      },
    },

    setup(props) {
      return { ...useFullScreen(props) }
    },
  })
</script>

<style lang="scss" scoped></style>
