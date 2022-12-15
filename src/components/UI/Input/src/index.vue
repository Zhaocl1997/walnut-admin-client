<script lang="tsx">
import { omit } from 'lodash-es'
import { clearIllegalChars, upperFirst } from 'easy-fns-ts'
import type { WInputProps } from './types'
import { extendedProps, props } from './props'

export default defineComponent({
  name: 'WInput',

  props,

  emits: ['update:value'],

  setup(props: WInputProps, { attrs, slots, emit, expose }) {
    const inputSlots = computed(() => {
      const def: {
        suffix?: Fn
        prefix?: Fn
        suffixIcon?: Fn
        prefixIcon?: Fn
        separator?: Fn
      } = {}

      // prop suffix/prefix
      props.suffix && (def.suffix = () => props.suffix)
      props.prefix && (def.prefix = () => props.prefix)

      // prop icon for suffix/prefix
      props.suffixIcon
          && (def.suffix = () => <w-icon icon={props.suffixIcon}></w-icon>)
      props.prefixIcon
          && (def.prefix = () => <w-icon icon={props.prefixIcon}></w-icon>)

      // copy component for input
      props.copiable
          && props.value
          && (def.suffix = () => (
            <w-copy
              icon
              source={props.value}
              onClick={(e: MouseEvent) => {
                e.stopPropagation()
              }}
            ></w-copy>
          ))

      // help message
      props.helpMessage
          && (def.suffix = () => (
            <n-tooltip>
              {{
                default: () => props.helpMessage,
                trigger: () => (
                  <w-icon icon="ant-design:question-circle-outlined"></w-icon>
                ),
              }}
            </n-tooltip>
          ))

      // slot has highest priority
      slots.suffix && (def.suffix = () => slots.suffix?.())
      slots.prefix && (def.prefix = () => slots.prefix?.())
      slots.separator && (def.separator = () => slots.separator?.())

      return def
    })

    const onUpdateValue = (val: string) => {
      if (!props.pair) {
        val = clearIllegalChars(val, props.blackList!)
        props.valueModifiers?.trim && (val = val.trim())
        props.valueModifiers?.capitalize && (val = upperFirst(val))
        props.valueModifiers?.uppercase && (val = val.toLocaleUpperCase())
      }

      emit('update:value', val)
    }

    return () => (
        <n-input
          {...omit(props, Object.keys(extendedProps))}
          onInput={onUpdateValue}
        >
          {unref(inputSlots)}
        </n-input>
    )
  },
})
</script>
