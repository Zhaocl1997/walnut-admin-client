<script lang="tsx">
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
        default: '24',
      },
    },

    setup(props) {
      const { width } = props
      const { isFullscreen, toggleFullScreen } = useFullScreen(props)

      return () => (
        <w-icon
          icon={
            isFullscreen.value
              ? 'ant-design:fullscreen-exit-outlined'
              : 'ant-design:fullscreen-outlined'
          }
          width={width}
          onClick={toggleFullScreen}
        ></w-icon>
      )
    },
  })
</script>
