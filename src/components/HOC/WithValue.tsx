export const WithValueProps = {
  value: [String, Number, Boolean, Array] as PropType<
    string | number | boolean | string[] | number[] | (string & number)[]
  >,

  multiple: Boolean as PropType<boolean>,

  valueType: {
    type: String as PropType<'string' | 'number' | 'boolean'>,
    default: 'string',
  },

  valueSeparator: String as PropType<string>,
}

export type WithValueProp = Partial<ExtractPropTypes<typeof WithValueProps>>

export function WithValue(WrappedComponent: ReturnType<typeof defineComponent>) {
  return defineComponent({
    name: 'WithValue',

    props: WithValueProps,

    emits: ['update:value'],

    setup(props, { emit, slots }) {
      const v = ref()

      const formateDefaultValue = (fn: Fn) => {
        !props.valueSeparator
          ? (v.value = (props.value as string[]).map(ov => fn(ov)))
          : (v.value
              = props.value
                && (props.value as string)
                  .split(props.valueSeparator)
                  .map(ov => fn(ov)))
      }

      const transformBoolean = (v: any) => {
        if (v === true)
          return 'true'
        if (v === false)
          return 'false'
        if (v === 'true')
          return true
        if (v === 'false')
          return false
      }

      watchEffect(() => {
        if ([null, undefined, '', Number.NaN].includes(props.value as any)) {
          v.value = null
          return
        }

        if (props.multiple === true) {
          if (props.valueType === 'string')
            formateDefaultValue(ov => ov.toString())
          else if (props.valueType === 'number')
            formateDefaultValue(ov => +ov)
          else
            formateDefaultValue(ov => transformBoolean(ov))
        }
        else {
          if (props.valueType === 'string')
            v.value = `${props.value}`
          else if (props.valueType === 'number')
            v.value = +props.value!
          else
            v.value = transformBoolean(props.value)
        }
      })

      const onUpdateValue = (val: StringOrNumber[]) => {
        v.value = val
        emit(
          'update:value',
          props.valueType === 'boolean'
            ? transformBoolean(val)
            : !props.valueSeparator
                ? val
                : val.join(props.valueSeparator),
        )
      }

      return () => (
        <WrappedComponent
          {...props}
          value={v.value}
          onUpdateValue={onUpdateValue}
        >
          {slots}
        </WrappedComponent>
      )
    },
  })
}
