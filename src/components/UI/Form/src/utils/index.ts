import type { FormItemRule } from 'naive-ui'
import type { WForm } from '../types'
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

/**
 * @description generate form item label base on different config
 */
export const getFormTranslated = (
  t: Fn,
  props: ComputedRef<WForm.Props>,
  item: WForm.Schema.Item,
  helpMsg = false
) => {
  const key = props.value.localeUniqueKey

  const isLocale = key && getBoolean(item.formProp?.locale)

  const isLocaleWithTable =
    getBoolean(item.formProp?.localeWithTable) &&
    getBoolean(props.value.localeWithTable)

  const isHelpMsg = (key: string) => (helpMsg ? `${key}:helpMsg` : key)

  const path = item.formProp?.path

  return isLocale && path
    ? defaultAppLocaleMessageKeys.includes(path!)
      ? t(`app:base:${path}`)
      : isLocaleWithTable
      ? t(isHelpMsg(`table:${key}:${path}`) as string)
      : t(isHelpMsg(`form:${key}:${path}`))
    : helpMsg
    ? item.formProp?.labelHelpMessage
    : item.formProp?.label
}

/**
 * @description generate base rules based on schemas
 */
export const generateBaseRules = (
  schemas: WForm.Schema.Item[],
  props: ComputedRef<WForm.Props>
) => {
  const { t } = useAppI18n()

  const getBaseRuleObj = (
    i: WForm.Schema.Item,
    extra?: FormItemRule[]
  ): FormItemRule[] => {
    const base: FormItemRule[] = [
      {
        key: i?.formProp?.path,
        type: i.formProp?.ruleType || 'any',
        trigger: ['change', 'input'],
        required: true,
        message: t('comp:form:rule', {
          type:
            i?.type === 'Base:Input'
              ? t('comp:base:input')
              : t('comp:base:choose'),
          label: getFormTranslated(t, props, i),
        }),
      },
    ]

    return extra ? base.concat(extra) : base
  }

  return Object.fromEntries(
    schemas
      .map((i) => {
        if (i.formProp?.path && i.formProp?.rule !== false) {
          return [
            i.formProp.path,
            i.formProp.rule
              ? getBaseRuleObj(
                  i,
                  (Array.isArray(i.formProp.rule)
                    ? i.formProp.rule
                    : [i.formProp.rule]) as FormItemRule[]
                )
              : getBaseRuleObj(i),
          ]
        }
        return []
      })
      .filter((i) => i.length !== 0)
  )
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
