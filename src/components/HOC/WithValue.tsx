export const WithValueProps = {
  value: [String, Number, Array] as PropType<
    string | number | string[] | number[] | (string & number)[]
  >,

  multiple: Boolean as PropType<boolean>,

  valueType: {
    type: String as PropType<'string' | 'number'>,
    default: 'string',
  },

  valueSeparator: String as PropType<string>,
}

export type WithValueProp = Partial<ExtractPropTypes<typeof WithValueProps>>

export const WithValue = (
  WrappedComponent: ReturnType<typeof defineComponent>
) => {
  return defineComponent({
    name: 'WithValue',

    props: WithValueProps,

    emits: ['update:value'],

    setup(props, { attrs, emit }) {
      const v = ref()

      const formateDefaultValue = (fn: Fn) => {
        !props.valueSeparator
          ? (v.value = (props.value as string[]).map((ov) => fn(ov)))
          : (v.value =
              props.value &&
              (props.value as string)
                .split(props.valueSeparator)
                .map((ov) => fn(ov)))
      }

      watchEffect(() => {
        if (!props.value) {
          v.value = null
          return
        }

        if (props.multiple === true) {
          if (props.valueType === 'string') {
            formateDefaultValue((ov) => ov.toString())
          } else {
            formateDefaultValue((ov) => +ov)
          }
        } else {
          if (props.valueType === 'string') {
            v.value = props.value + ''
          } else {
            v.value = +props.value!
          }
        }
      })

      const onUpdateValue = (val: StringOrNumber[]) => {
        v.value = val
        emit(
          'update:value',
          !props.valueSeparator ? val : val.join(props.valueSeparator)
        )
      }

      return () => (
        <WrappedComponent
          {...props}
          value={v.value}
          onUpdateValue={onUpdateValue}
        />
      )
    },
  })
}
