import type { WInputProps } from '../types'
import { clearIllegalChars } from 'easy-fns-ts'

/**
 * @description black list to filter
 */
export const useInputLegal = (props: WInputProps) => {
  const legalizedValue = (value: string) => {
    if (props.blackList && props.blackList.length !== 0) {
      value = clearIllegalChars(value, props.blackList)
    }

    return value
  }

  return { legalizedValue }
}
