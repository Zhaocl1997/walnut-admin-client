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
      const { isFullscreen, toggle } = useFullscreen()

      return () => (
        <div>
          <w-icon
            icon={
              isFullscreen.value
                ? 'ant-design:fullscreen-exit-outlined'
                : 'ant-design:fullscreen-outlined'
            }
            width={width}
            onClick={toggle}
          ></w-icon>
        </div>
      )
    },
  })
</script>
