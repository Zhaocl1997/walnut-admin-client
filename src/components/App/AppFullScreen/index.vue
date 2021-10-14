<script lang="tsx">
  import type { PropType } from 'vue'

  import { useAppFullScreen } from './useAppFullScreen'

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
      const { isFullscreen, toggleFullScreen } = useAppFullScreen(props)

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
