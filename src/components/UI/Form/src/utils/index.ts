import type { FormItemRule } from 'naive-ui'
import type { WForm } from '../types'
import { defaultAppLocaleMessageKeys } from '../../../shared'

// get target field boolean value
export function getFormBooleanField(item: WForm.Schema.Item | undefined, props: WForm.Props, field: WForm.MaybeBooleanField, defaultValue = true) {
  const maybeBool = item?.extraProp?.[field]

  if (typeof maybeBool === 'function')
    return maybeBool({ formData: props.model! })

  return getBoolean(unref(maybeBool), defaultValue)
}

/**
 * @description generate form item label base on different config
 */
export function getFormTranslated(t: Fn, props: ComputedRef<WForm.Props>, item: WForm.Schema.Item, type: WForm.LocaleType = 'origin') {
  // used for dict form item
  if (item.formProp?.label === true)
    return

  // used for desc form item
  if (!getBoolean(item?.descriptionProp?.show))
    return

  const key = props.value.localeUniqueKey

  const isLocale = key && getBoolean(item.formProp?.locale)

  const path = item.formProp?.path
  const label = item.formProp?.label

  // got label, return label
  if (label)
    return unref(label)

  // no locale nor no path
  // just return target field
  if (!isLocale || !path) {
    if (type === 'origin')
      return label
    if (type === 'helpMsg')
      return item.formProp?.labelHelpMessage
    if (type === 'placeholder')
      return item.componentProp?.placeholder
    return
  }

  // in default app locale messages keys
  if (defaultAppLocaleMessageKeys.includes(path))
    return t(`app.base.${path}`)

  const isLocaleWithTable
    = getBoolean(item.formProp?.localeWithTable)
      && getBoolean(props.value.localeWithTable)

  const format = (key: string) => {
    if (type === 'origin')
      return key
    if (type === 'helpMsg')
      return `${key}.helpMsg`
    if (type === 'placeholder')
      return `${key}.PH`
    if (type === 'rule')
      return `${key}.rule`
  }

  // locale with table, means locale key startsWith `table` insteadof `form`
  if (isLocaleWithTable)
    return t(`table.${format(`${key}.${path}`)}`)

  return t(`form.${format(`${key}.${path}`)}`)
}

/**
 * form item type that need to show `input` something
 */
export const inputFormItemTypeList = [
  'Base:Input',
  'Extend:Password',
  'Extend:SMSInput',
]

/**
 * generate different default rule message through based on `inputFormItemTypeList`
 */
export function generateRuleMessage(t: Fn, p: ComputedRef<WForm.Props>, i: WForm.Schema.Item) {
  return t('comp.form.rule', {
    type: inputFormItemTypeList.includes(i.type)
      ? t('comp.base.input')
      : t('comp.base.choose'),
    label: getFormTranslated(t, p, i),
  })
}

/**
 * @description generate base rules based on schemas
 */
export function generateBaseRules(schemas: WForm.Schema.Item[], props: ComputedRef<WForm.Props>) {
  const getBaseRuleObj = (
    i: WForm.Schema.Item,
    extra?: FormItemRule[],
  ): FormItemRule[] => {
    const base: FormItemRule[] = [
      {
        key: i?.formProp?.path,
        type: i.formProp?.ruleType || 'any',
        trigger: ['change', 'input'],
        required: true,
        message: generateRuleMessage(AppI18n.global.t, props, i),
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
                    : [i.formProp.rule]) as FormItemRule[],
                )
              : getBaseRuleObj(i),
          ]
        }
        return []
      })
      .filter(i => i.length !== 0),
  )
}

export function extractDefaultFormDataFromSchemas(schemas: WForm.Schema.Item[]) {
  if (!schemas)
    return {}

  return Object.fromEntries(
    unref(schemas)
      ?.map<[string, BaseDataType | BaseDataType[] | null]>(i => [
        i?.formProp?.path!,
        i?.componentProp?.defaultValue ?? null,
      ])
      .filter(i => i[0])!,
  )
}

export function generateFormItemId(item: WForm.Schema.Item, index: number) {
  return wbtoa(`${item.type}-${index}-${item?.formProp?.path}`)
}
