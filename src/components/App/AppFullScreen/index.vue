<script lang="tsx">
  export default defineComponent({
    name: 'AppFullScreen',

    inheritAttrs: false,

    setup(props) {
      const { isFullscreen, toggle } = useFullscreen()

      return () => (
        <w-icon
          icon={
            isFullscreen.value
              ? 'ant-design:fullscreen-exit-outlined'
              : 'ant-design:fullscreen-outlined'
          }
          width="24"
          onClick={toggle}
        ></w-icon>
      )
    },
  })
</script>
