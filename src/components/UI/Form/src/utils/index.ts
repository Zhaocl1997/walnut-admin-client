import type { WForm } from '../types'
import { isUndefined } from 'easy-fns-ts'
import { defaultAppLocaleMessageKeys } from '../../../shared'

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

/**
 * @description generate form item label base on different config
 */
export const getFormTranslated = (
  props: ComputedRef<WForm.Props>,
  item: WForm.Schema.Item,
  helpMsg = false
) => {
  const key = props.value.localeUniqueKey

  const isLocale = key && getBoolean(item?.formProp?.locale)

  const isLocaleWithTable =
    getBoolean(item?.formProp?.localeWithTable) &&
    getBoolean(props.value.localeWithTable)

  const isHelpMsg = (key: string) => (helpMsg ? `${key}:helpMsg` : key)

  const path = item?.formProp?.path

  return isLocale && path
    ? defaultAppLocaleMessageKeys.includes(path!)
      ? AppI18n?.global.t(`app:base:${path}`)
      : isLocaleWithTable
      ? AppI18n?.global.t(isHelpMsg(`table:${key}:${path}`) as string)
      : AppI18n?.global.t(isHelpMsg(`form:${key}:${path}`))
    : item?.formProp?.label
}

/**
 * @description default item type pool which could trigger the validation
 */
export const defaultTriggerPool = ['Base:Input', 'Base:Select']

/**
 * @description default trigger event
 */
export const defaultTriggerEvent = ['input', 'change', 'blur']

/**
 * @description generate base rules based on schemas
 */
export const generateBaseRules = (
  schemas: WForm.Schema.Item[],
  props: ComputedRef<WForm.Props>
) => {
  const rules = {}

  const { t } = useAppI18n()

  schemas.map((i) => {
    if (i?.formProp?.path && i?.formProp?.rule !== false) {
      rules[i?.formProp?.path] = [
        defaultTriggerPool.includes(i?.type) || i?.formProp?.baseRuleApplied
          ? {
              trigger: defaultTriggerEvent,
              required: true,
              message: t('comp:form:rule', {
                type:
                  i?.type === 'Base:Input'
                    ? t('comp:base:input')
                    : t('comp:base:choose'),
                label: getFormTranslated(props, i),
              }),
            }
          : {
              required: true,
              message: t('comp:form:rule', {
                type:
                  i?.type === 'Base:Input'
                    ? t('comp:base:input')
                    : t('comp:base:choose'),
                label: getFormTranslated(props, i),
              }),
            },
      ]
    }
  })

  return rules
}

export const extractDefaultFormDataFromSchemas = (
  schemas: WForm.Schema.Item[]
) => {
  if (!schemas) return {}

  return Object.fromEntries(
    unref(schemas)
      ?.map<[string, BaseDataType | BaseDataType[] | null]>((i) => [
        i?.formProp?.path!,
        i?.componentProp?.defaultValue ?? null,
      ])
      .filter((i) => i[0])!
  )
}
