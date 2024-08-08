<script lang="tsx">
export default defineComponent({
  name: 'WArrow',

  props: {
    icon: {
      type: String as PropType<string>,
      default: 'ant-design:down-outlined',
    },
    active: Boolean as PropType<boolean>,
    right: Boolean as PropType<boolean>,
    left: Boolean as PropType<boolean>,
  },

  setup(props) {
    const getClass = computed(() => {
      const { active, right, left } = props
      if (typeof active === 'boolean') {
        return [
          'w-arrow',
          {
            'w-arrow--active': active,
            right,
            left,
          },
        ]
      }

      return 'u-none'
    })

    return () => (
      <w-icon
        icon={props.icon}
        width="16"
        class={unref(getClass)}
        style="cursor: pointer"
      >
      </w-icon>
    )
  },
})
</script>

<style lang="scss" scoped>
  .w-arrow {
  display: inline-block;
  transform: rotate(0deg);
  transform-origin: center center;
  transition: all 0.3s ease 0.1s;

  &--active {
    transform: rotate(180deg);
  }

  &.right {
    transform: rotate(-90deg);
  }

  &.right.w-arrow--active {
    transform: rotate(90deg);
  }

  &.left {
    transform: rotate(90deg);
  }

  &.left.w-arrow--active {
    transform: rotate(-90deg);
  }
}
</style>
