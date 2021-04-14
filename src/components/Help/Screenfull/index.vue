<template>
  <div @click="onToggleScreenfull">
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

  import { useScreenfull } from './useScreenfull'

  export default defineComponent({
    name: 'WScreenfull',

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
      return { ...useScreenfull(props) }
    },
  })
</script>

<style lang="scss" scoped></style>
