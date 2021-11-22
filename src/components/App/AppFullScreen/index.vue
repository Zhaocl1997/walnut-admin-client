<script lang="tsx">
  import { useFullScreenExtend } from './useFullScreenExtend'

  export default defineComponent({
    name: 'AppFullScreen',

    inheritAttrs: false,

    props: {
      width: {
        type: String as PropType<string>,
        default: '24',
      },
    },

    setup(props) {
      const { appMemo } = useAppState()
      const { width } = props
      const { isFullscreen, toggle } = useFullScreenExtend()

      return () => (
        <div>
          <w-icon
            icon={
              isFullscreen.value
                ? 'ant-design:fullscreen-exit-outlined'
                : 'ant-design:fullscreen-outlined'
            }
            width={width}
            onClick={() => {
              appMemo.value.fullscreenTarget = '#app'
              toggle()
            }}
          ></w-icon>
        </div>
      )
    },
  })
</script>
