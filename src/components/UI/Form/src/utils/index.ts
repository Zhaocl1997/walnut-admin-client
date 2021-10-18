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

// generate base rules based on schemas
export const generateBaseRules = (schemas: any[]) => {
  const ret = {}

  const paths = schemas.map((i) => i?.formProp?.path).filter((i) => i)

  paths.map((i) => {
    ret[i] = [
      {
        required: true,
        message: 'Required!',
      },
    ]
  })

  return ret
}
