<script lang="tsx">
  // TODO 99
  import WIcon from '@/components/UI/Icon'
  import { getThemeColors } from './utils'

  export default defineComponent({
    name: 'AppColors',

    inheritAttrs: false,

    emits: ['update:modelValue'],

    props: {
      modelValue: String as PropType<string>,
      disabled: Boolean as PropType<boolean>,
    },

    setup(props, { emit }) {
      const colors = getThemeColors(props.modelValue!)

      return () => (
        <div class="hstack space-x-3">
          {colors?.map((color) => (
            <span
              onClick={() =>
                !props.disabled && emit('update:modelValue', color)
              }
              class={[
                'h-5 w-5 rounded border-1 border-primary',
                { 'cursor-pointer': !props.disabled },
                { 'cursor-not-allowed opacity-50': props.disabled },
              ]}
              style={{ background: color }}
              title={color}
            >
              {props.modelValue === color && (
                <WIcon height="18" icon="ant-design:check-outlined" />
              )}
            </span>
          ))}
        </div>
      )
    },
  })
</script>
