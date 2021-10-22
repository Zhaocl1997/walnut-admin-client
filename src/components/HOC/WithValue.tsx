const props = {
  valueType: {
    type: String as PropType<'string' | 'number'>,
    default: 'string',
  },

  valueSeparator: {
    type: String as PropType<string>,
    default: '',
  },
}

export type WithValueProp = Partial<ExtractPropTypes<typeof props>>

export const WithValue = (
  WrappedComponent: ReturnType<typeof defineComponent>
) => {
  return defineComponent({
    inheritAttrs: false,

    props,

    emits: ['update:value'],

    setup(prop, { attrs, emit }) {
      const { value = '', multiple = false } = attrs as any
      const v = ref()

      const formateDefaultValue = (fn: Fn) => {
        !prop.valueSeparator
          ? (v.value = value.map((ov: any) => fn(ov)))
          : (v.value = value
              .split(prop.valueSeparator)
              .map((ov: any) => fn(ov)))
      }

      onMounted(() => {
        if (multiple === true || multiple === '') {
          if (prop.valueType === 'string') {
            formateDefaultValue((ov) => ov.toString())
          } else {
            formateDefaultValue((ov) => +ov)
          }
        } else {
          if (prop.valueType === 'string') {
            v.value = value + ''
          } else {
            v.value = +value
          }
        }
      })

      const onUpdateValue = (val: StringOrNumber[]) => {
        v.value = val
        emit(
          'update:value',
          !prop.valueSeparator ? val : val.join(prop.valueSeparator)
        )
      }

      return () => (
        <WrappedComponent
          {...attrs}
          value={v.value}
          onUpdateValue={onUpdateValue}
        />
      )
    },
  })
}
