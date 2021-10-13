import type { WForm } from '../types'
import { isUndefined } from 'easy-fns-ts'

// get target field boolean value
export const getEPBooleanValue = (
  item: WForm.Schema.Item | undefined,
  formProps: WForm.Props,
  field: string,
  defaultValue = true
) => {
  const maybeBool = item?.extraProp?.[field]

  if (typeof maybeBool === 'function') {
    return maybeBool({ formData: formProps.model! })
  }

  return getBoolean(maybeBool, defaultValue)
}

// handle undefined to defaultValue
export const getBoolean = (val: any, df = true) => (isUndefined(val) ? df : val)
