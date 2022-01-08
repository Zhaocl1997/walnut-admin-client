<script lang="tsx">
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
      const { width } = props
      const { isFullscreen, enter } = useFullscreen()

      return () => (
        <div>
          <w-icon
            icon={
              isFullscreen.value
                ? 'ant-design:fullscreen-exit-outlined'
                : 'ant-design:fullscreen-outlined'
            }
            width={width}
            onClick={enter}
          ></w-icon>
        </div>
      )
    },
  })
</script>
