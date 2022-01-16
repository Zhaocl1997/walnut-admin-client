<script lang="tsx">
  import WIcon from '/@/components/UI/Icon'

  export default defineComponent({
    name: 'AppColors',

    inheritAttrs: false,

    props: {
      colors: Array as PropType<string[]>,
      formDataColor: String as PropType<string>,
      clickEvent: Function as PropType<(color: string) => void>,
    },

    setup(props) {
      return () => (
        <div class="flex flex-row flex-nowrap space-x-3">
          {props.colors?.map((color) => (
            <span
              onClick={() => props.clickEvent!(color)}
              class="h-5 w-5 rounded cursor-pointer border-1 border-primary"
              style={{ background: color }}
              title={color}
            >
              {props.formDataColor === color && (
                <WIcon height="18" icon="ant-design:check-outlined" />
              )}
            </span>
          ))}
        </div>
      )
    },
  })
</script>
