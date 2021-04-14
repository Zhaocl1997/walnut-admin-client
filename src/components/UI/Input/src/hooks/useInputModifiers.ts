import type { WInputModifiers, WInputProps } from '../types'
import { line2Camel } from 'easy-fns-ts'

/**
 * @description custom modifiers https://v3.cn.vuejs.org/guide/component-custom-events.html#%E5%A4%84%E7%90%86-v-model-%E4%BF%AE%E9%A5%B0%E7%AC%A6
 */
export const useInputModifiers = (props: WInputProps) => {
  const modifiedValue = (value: string) => {
    const {
      capitalize,
      uppercase,
      camel,
      trim,
    } = props.modelModifiers as WInputModifiers

    if (capitalize) {
      value = value.charAt(0).toUpperCase() + value.slice(1)
    }

    if (uppercase) {
      value = value.toLocaleUpperCase()
    }

    if (camel) {
      value = value.charAt(0).toUpperCase() + value.slice(1)
      value = line2Camel(value)
    }

    if (trim) {
      value = value.trim()
    }

    return value
  }

  return {
    modifiedValue,
  }
}
