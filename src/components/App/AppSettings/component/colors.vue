<script lang="tsx">
// TODO 99
import { getThemeColors } from './utils'
import WIcon from '@/components/UI/Icon'

export default defineComponent({
  name: 'AppColors',

  inheritAttrs: false,

  props: {
    modelValue: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const colors = getThemeColors(props.modelValue!)

    return () => (
        <div class="hstack space-x-3">
          {colors?.map(color => (
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
                <WIcon height="18" icon="ant-design:check-outlined"></WIcon>
              )}
            </span>
          ))}
        </div>
    )
  },
})
</script>
