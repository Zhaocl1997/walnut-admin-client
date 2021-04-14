import {
  isBoolean,
  easyIsEmpty,
  easyIsEqual,
  easyOmit,
  isArray,
  isString,
} from 'easy-fns-ts'
import { Ref, ComponentInternalInstance, watchEffect } from 'vue'
import { ref, unref, computed, watch, getCurrentInstance } from 'vue'

// TODO refactor
export const useValueFormat = () => {
  const instance: ComponentInternalInstance = getCurrentInstance()!
  const { props, attrs, emit } = instance
  const { valueFormat, valueType, valueKey, optionValue }: any = props

  const originalValue: Ref<any> = ref('')

  const getCanFormat = computed(() => {
    return props.multiple && valueFormat && !valueKey
  })

  // remove modelValue
  const getBindValue = computed(() => {
    return easyOmit({ ...attrs, ...props }, 'modelValue')
  })

  const onArrToStr = (val: any[]) => {
    if (val && isArray(val)) {
      return val.join(valueFormat)
    }
    return ''
  }

  const onStrToArr = (val: string) => {
    if (val && isString(val)) {
      return val.split(valueFormat)
    }
    return []
  }

  const onSingleFormatType = (val: string | number) => {
    if (!val) {
      return
    }

    if (valueType === 'string') {
      return String(val)
    }

    if (valueType === 'number') {
      return Number(val)
    }
  }

  const onMultipleFormatType = (val: any[]) => {
    if (val[0] === undefined) {
      return
    }

    if (valueType === 'string') {
      return val.map(String)
    }

    if (valueType === 'number') {
      return val.map(Number)
    }
  }

  const onFormatValueType = (val: any) => {
    if (valueKey) {
      if (props.multiple) {
        if (val[0] === undefined) {
          return
        }

        return val.map((i: any) => {
          return {
            ...i,
            [optionValue]: onSingleFormatType(i[optionValue]),
          }
        })
      } else {
        return {
          ...val,
          [optionValue]: onSingleFormatType(val[optionValue]),
        }
      }
    } else {
      if (props.multiple) {
        return onMultipleFormatType(val)
      } else {
        return onSingleFormatType(val)
      }
    }
  }

  watch(
    () => props.modelValue,
    (val: any, oldVal: any) => {
      if (easyIsEqual(val, oldVal)) {
        return
      }

      // initalize for multiple array
      if (easyIsEmpty(val)) {
        if (props.multiple) {
          originalValue.value = []
          return
        }
      }

      // boolean
      if (isBoolean(props.modelValue)) {
        originalValue.value = props.modelValue
        return
      }

      // format type
      originalValue.value = onFormatValueType(
        getCanFormat.value ? onStrToArr(unref(val)) : unref(val)
      )
    },
    {
      deep: true,
      immediate: true,
    }
  )

  watchEffect(() => {
    const modelValue = getCanFormat.value
      ? onArrToStr(unref(originalValue))
      : unref(originalValue)

    if (modelValue) {
      emit('update:modelValue', modelValue)
    }
  })

  return {
    originalValue,
    getBindValue,
  }
}
